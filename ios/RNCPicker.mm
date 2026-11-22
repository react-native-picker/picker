/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "RNCPicker.h"
#ifdef RCT_NEW_ARCH_ENABLED
#import "RNCPickerFabricConversions.h"
#endif

#import <React/RCTConvert.h>
#import <React/RCTUtils.h>

@interface RNCPicker() <UIPickerViewDataSource, UIPickerViewDelegate, UIPickerViewAccessibilityDelegate>
@property (nonatomic, assign) NSUInteger selectionGeneration;
@end

@implementation RNCPicker

- (instancetype)initWithFrame:(CGRect)frame
{
  self = [super initWithFrame:frame];
  if (!self) return nil;
  
  _color = [UIColor blackColor];
  _font = [UIFont systemFontOfSize:21]; // TODO: selected title default should be 23.5
  _selectedIndex = NSNotFound;
  _textAlign = NSTextAlignmentCenter;
  _numberOfLines = 1;
  
  self.delegate = self;
  self.dataSource = self;
  
  [self selectRow:0 inComponent:0 animated:YES]; // Workaround for missing selection indicator lines (see https://stackoverflow.com/questions/39564660/uipickerview-selection-indicator-not-visible-in-ios10)
  
  return self;
}

RCT_NOT_IMPLEMENTED(- (instancetype)initWithCoder:(NSCoder *)aDecoder)

// Selection is deferred so UIPickerView can finish processing the props update.
// A native callback or reload may establish a newer selection before this runs.
- (void)scheduleSelectionOfRow:(NSInteger)row
                      animated:(BOOL)animated
                    generation:(NSUInteger)generation
{
  dispatch_async(dispatch_get_main_queue(), ^{
    if (self.selectionGeneration == generation) {
      [self selectRow:row inComponent:0 animated:animated];
    }
  });
}

- (void)setItems:(NSArray<NSDictionary *> *)items
{
  if ([_items isEqualToArray:items]) {
    return;
  }

  _selectionGeneration += 1;
  _items = [items copy];
  [self setNeedsLayout];
}

- (BOOL)isUserScrolling
{
  // UIPickerView drives each wheel with an internal UIScrollView. Walk the
  // subview tree and report whether any of them is currently being touched or
  // is still settling after a fling.
  NSMutableArray<UIView *> *stack = [NSMutableArray arrayWithArray:self.subviews];
  while (stack.count > 0) {
    UIView *view = stack.lastObject;
    [stack removeLastObject];
    if ([view isKindOfClass:[UIScrollView class]]) {
      UIScrollView *scrollView = (UIScrollView *)view;
      if (scrollView.isTracking || scrollView.isDragging || scrollView.isDecelerating) {
        return YES;
      }
    }
    [stack addObjectsFromArray:view.subviews];
  }
  return NO;
}

- (void)setSelectedIndex:(NSInteger)selectedIndex
{
  // While the user is physically manipulating the wheel, a controlled parent can
  // echo back a stale selected index and re-drive selectRow: mid-gesture. Under
  // the New Architecture this re-enters UIPickerView's suspended update cycle
  // during hit-testing and crashes. didSelectRow: already keeps the internal
  // index accurate, so skipping the programmatic update here is safe; idle resets
  // still apply.
  if ([self isUserScrolling]) {
    return;
  }
  if (_selectedIndex != selectedIndex) {
    BOOL animated = _selectedIndex != NSNotFound; // Don't animate the initial value
    _selectedIndex = selectedIndex;
    NSUInteger selectionGeneration = ++_selectionGeneration;
    [self scheduleSelectionOfRow:selectedIndex
                         animated:animated
                       generation:selectionGeneration];
  }
}

- (void)reloadAllComponents
{
  // Re-queue the latest known selection after the reload without animation.
  NSUInteger selectionGeneration = ++_selectionGeneration;
  [super reloadAllComponents];

  if (_selectedIndex != NSNotFound && _selectedIndex < (NSInteger)_items.count) {
    [self scheduleSelectionOfRow:_selectedIndex
                         animated:NO
                       generation:selectionGeneration];
  }
}

- (void)setNumberOfLines:(NSInteger)numberOfLines
{
  if (_numberOfLines == numberOfLines) {
    return;
  }

  _numberOfLines = numberOfLines;
  [self reloadAllComponents];
  [self setNeedsLayout];
}

- (void) setFont:(UIFont *)font
{
  if ([_font isEqual:font]) {
    return;
  }

  _font = font;
  [self reloadAllComponents];
  [self setNeedsLayout];
}

#pragma mark - UIPickerViewDataSource protocol

- (NSInteger)numberOfComponentsInPickerView:(__unused UIPickerView *)pickerView
{
  return 1;
}

- (NSInteger)pickerView:(__unused UIPickerView *)pickerView
numberOfRowsInComponent:(__unused NSInteger)component
{
  return _items.count;
}

#pragma mark - UIPickerViewDelegate methods

- (NSString *)pickerView:(__unused UIPickerView *)pickerView
             titleForRow:(NSInteger)row
            forComponent:(__unused NSInteger)component
{
  return [RCTConvert NSString:_items[row][@"label"]];
}

- (CGFloat)pickerView:(__unused UIPickerView *)pickerView rowHeightForComponent:(__unused NSInteger) component {
  return (_font.lineHeight) * _numberOfLines + 20;
}

- (UIView *)pickerView:(UIPickerView *)pickerView
            viewForRow:(NSInteger)row
          forComponent:(NSInteger)component
           reusingView:(UIView *)view
{
  if (!view) {
      CGFloat rowHeight = [pickerView rowSizeForComponent:component].height;
      CGFloat rowWidth = [pickerView rowSizeForComponent:component].width;
      view = [[UIView alloc] initWithFrame:CGRectZero];
      RNCPickerLabel* label = [[RNCPickerLabel alloc] initWithFrame:(CGRect) {
          CGPointZero,
          {
              rowWidth,
              rowHeight,
          }
      }];
    [view insertSubview:label atIndex:0];
  }

  RNCPickerLabel* label = view.subviews[0];
  label.font = _font;

  id colorValue = _items[row][@"textColor"];

  // New Architecture: color props is already resolved to UIColor
  // Old architecture: JS color value, RCTConvert is required
  if ([colorValue isKindOfClass:[UIColor class]]) {
    label.textColor = (UIColor *)colorValue;
  } else {
    label.textColor = [RCTConvert UIColor:colorValue] ?: _color;
  }

  label.textAlignment = _textAlign;
  label.text = [self pickerView:pickerView titleForRow:row forComponent:component];
  label.accessibilityIdentifier = _items[row][@"testID"];
    
  label.numberOfLines = _numberOfLines;

  label.leftInset = 20.0;
  label.rightInset = 20.0;
  
  return view;
}

- (void)pickerView:(__unused UIPickerView *)pickerView
      didSelectRow:(NSInteger)row inComponent:(__unused NSInteger)component
{
  _selectionGeneration += 1;
  _selectedIndex = row;
  if (_onChange && _items.count > (NSUInteger)row) {
    _onChange(@{
      @"newIndex": @(row),
      @"newValue": RCTNullIfNil(_items[row][@"value"]),
    });
  }
}

#pragma mark - UIPickerViewAccessibilityDelegate

- (NSString *)pickerView:(UIPickerView *)pickerView accessibilityLabelForComponent:(NSInteger)component
{
    return self.accessibilityLabel;
}

- (NSString *)pickerView:(UIPickerView *)pickerView accessibilityHintForComponent:(NSInteger)component
{
    return self.accessibilityHint;
}


#ifdef RCT_NEW_ARCH_ENABLED
- (void)pickerView:(__unused UIPickerView *)pickerView
      didSelectRow:(NSInteger)row inComponent:(__unused NSInteger)component
  withEventEmitter:(facebook::react::SharedViewEventEmitter)eventEmitter
{
    _selectionGeneration += 1;
    _selectedIndex = row;
      if (eventEmitter != nullptr && _items.count > (NSUInteger)row) {
          std::dynamic_pointer_cast<const facebook::react::RNCPickerEventEmitter>(eventEmitter)
              ->onChange(facebook::react::RNCPickerEventEmitter::OnChange{
                  .newIndex = (int)row,
                  .newValue =  RNCPickerRNCPickerConvertIdToFollyDynamic(_items[row][@"value"]),
              });
        }
}
#endif

@end
