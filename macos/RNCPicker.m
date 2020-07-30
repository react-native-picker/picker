/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "RNCPicker.h"

#import <React/RCTConvert.h>
#import <React/RCTUtils.h>


@interface RNCPicker() <NSComboBoxDataSource, NSComboBoxDelegate>
@end

@implementation RNCPicker

- (instancetype)initWithFrame:(CGRect)frame
{
    if ((self = [super initWithFrame:frame pullsDown:false])) {
        _color = [NSColor blackColor];
        _font  = [NSFont systemFontOfSize:21];
        _selectedIndex = NSNotFound;
        _textAlign     = NSTextAlignmentCenter;
        //self.dataSource = self;
        //self.delegate =  self;
        //self.completes = true;
        [self selectItemAtIndex:0];
        [[self menu] setFont:_font];
        self.pullsDown = false;
        [self setAction:@selector(mySelector:)];
        [self setTarget:self];

    }
    return self;
  /*if ((self = [super initWithFrame:frame])) {
    _color = [UIColor blackColor];
    _font = [UIFont systemFontOfSize:21]; // TODO: selected title default should be 23.5
    _selectedIndex = NSNotFound;
    _textAlign = NSTextAlignmentCenter;
    self.delegate = self;
    self.dataSource = self;
    [self selectRow:0 inComponent:0 animated:YES]; // Workaround for missing selection indicator lines (see https://stackoverflow.com/questions/39564660/uipickerview-selection-indicator-not-visible-in-ios10)
  }
  return self;*/
}


//RCT_NOT_IMPLEMENTED(- (instancetype)initWithCoder:(NSCoder *)aDecoder)

- (void)setItems:(NSArray<NSDictionary *> *)items
{
    _items = [items copy];
    /*NSDictionary *attributes = [NSDictionary
    dictionaryWithObjectsAndKeys:
    color, NSForegroundColorAttributeName,
    font,
    NSFontAttributeName, textAlign, NSParagraphStyleAttributeName, nil];*/
    NSMutableParagraphStyle *paragraphStyle = [[NSMutableParagraphStyle alloc] init];
    [paragraphStyle setAlignment:_textAlign];
    
    [paragraphStyle setHeadIndent:0];
    [self removeAllItems];
    NSInteger index = 0;
    for (id item in _items) {
        [self addItemWithTitle:item[@"label"]];
        NSColor *color = [RCTConvert NSColor:item[@"textColor"]] ?: _color;
        NSMenuItem * row = [self itemArray][index];
        NSDictionary *attributes = [NSDictionary dictionaryWithObjectsAndKeys:
                                    color, NSForegroundColorAttributeName, _font, NSFontAttributeName, paragraphStyle, NSParagraphStyleAttributeName ,nil];
        NSAttributedString *as = [[NSAttributedString alloc]
                    initWithString:[row title]
                    attributes:attributes];
        [row setAttributedTitle:as];
        index++;
    }
    [self setNeedsLayout:true];

}


- (void)setSelectedIndex:(NSInteger)selectedIndex
{
  if (_selectedIndex != selectedIndex) {
    //BOOL animated = _selectedIndex != NSNotFound; // Don't animate the initial value
    _selectedIndex = selectedIndex;
    dispatch_async(dispatch_get_main_queue(), ^{
        [self setSelectedIndex:selectedIndex];
    });
  }
}



/*- (NSInteger)pickerView:(__unused UIPickerView *)pickerView
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

- (CGFloat)pickerView:(__unused UIPickerView *)pickerView rowHeightForComponent:(NSInteger)__unused component {
  return _font.pointSize + 19;
}

- (UIView *)pickerView:(UIPickerView *)pickerView
            viewForRow:(NSInteger)row
          forComponent:(NSInteger)component
           reusingView:(UILabel *)label
{
  if (!label) {
    label = [[UILabel alloc] initWithFrame:(CGRect){
      CGPointZero,
      {
        [pickerView rowSizeForComponent:component].width,
        [pickerView rowSizeForComponent:component].height,
      }
    }];
  }

  label.font = _font;

  label.textColor = [RCTConvert UIColor:_items[row][@"textColor"]] ?: _color;

  label.textAlignment = _textAlign;
  label.text = [self pickerView:pickerView titleForRow:row forComponent:component];
  return label;
}

- (void)pickerView:(__unused UIPickerView *)pickerView
      didSelectRow:(NSInteger)row inComponent:(__unused NSInteger)component
{
  _selectedIndex = row;
  if (_onChange && _items.count > (NSUInteger)row) {
    _onChange(@{
      @"newIndex": @(row),
      @"newValue": RCTNullIfNil(_items[row][@"value"]),
    });
  }
}
*/

- (IBAction)mySelector:(id)sender {
    NSString *str = [(NSPopUpButton *) sender titleOfSelectedItem];
    NSInteger row = [self findLabel:str];
    if (row != -1 && _onChange) {
        _onChange(@{
          @"newIndex": @(row),
          @"newValue": RCTNullIfNil(_items[row][@"value"]),
        });
    }
}

- (NSInteger) findLabel:(NSString*)value {
    NSInteger val = 0;
    for (id opt in _items) {
        if (opt[@"label"] == value) {
            return val;
        }
        val++;
    }
    return -1;
}
@end
