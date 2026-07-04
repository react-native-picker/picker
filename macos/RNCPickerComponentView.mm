#import "RNCPickerComponentView.h"

#import <React/RCTConversions.h>
#import <React/RCTFabricComponentsPlugins.h>
#import <react/renderer/components/rnpicker/ComponentDescriptors.h>
#import <react/renderer/components/rnpicker/Props.h>
#import <react/renderer/components/rnpicker/RCTComponentViewHelpers.h>

#import "RNCPickerFabricConversions.h"

using namespace facebook::react;

@interface RNCPickerComponentView () <RCTRNCPickerViewProtocol>
@end

@implementation RNCPickerComponentView {
  NSPopUpButton *_picker;
  NSArray<NSDictionary *> *_items;
  NSInteger _selectedIndex;
  NSColor *_color;
  NSFont *_font;
  NSTextAlignment _textAlign;
  BOOL _enabled;
}

+ (ComponentDescriptorProvider)componentDescriptorProvider
{
  return concreteComponentDescriptorProvider<RNCPickerComponentDescriptor>();
}

+ (void)load
{
  [super load];
}

- (instancetype)initWithFrame:(CGRect)frame
{
  if (self = [super initWithFrame:frame]) {
    static const auto defaultProps = std::make_shared<const RNCPickerProps>();
    _props = defaultProps;

    _picker = [[NSPopUpButton alloc] initWithFrame:NSZeroRect pullsDown:NO];
    [_picker setTranslatesAutoresizingMaskIntoConstraints:NO];
    _picker.target = self;
    _picker.action = @selector(_onChange:);
    _items = @[];
    _selectedIndex = 0;
    _color = nil;
    _font = [NSFont systemFontOfSize:[NSFont systemFontSize]];
    _textAlign = NSTextAlignmentLeft;
    _enabled = YES;

    [self addSubview:_picker];

    [NSLayoutConstraint activateConstraints:@[
      [_picker.leadingAnchor constraintEqualToAnchor:self.leadingAnchor],
      [_picker.trailingAnchor constraintEqualToAnchor:self.trailingAnchor],
      [_picker.topAnchor constraintEqualToAnchor:self.topAnchor],
      [_picker.bottomAnchor constraintEqualToAnchor:self.bottomAnchor],
    ]];
  }
  return self;
}

- (void)updateProps:(const Props::Shared &)props oldProps:(const Props::Shared &)oldProps
{
  const auto &newProps = *std::static_pointer_cast<const RNCPickerProps>(props);

  // Build items array
  NSMutableArray *items = [NSMutableArray new];
  for (const auto &item : newProps.items) {
    NSMutableDictionary *dictItem = [NSMutableDictionary new];
    dictItem[@"value"] = RNCPickerConvertFollyDynamicToId(item.value);
    dictItem[@"label"] = RNCPickerConvertFollyDynamicToId(item.label);
    dictItem[@"enabled"] = @(item.enabled);

    if (item.textColor) {
      NSColor *textColor = RCTUIColorFromSharedColor(item.textColor);
      if (textColor) {
        dictItem[@"textColor"] = textColor;
      }
    }

    [items addObject:dictItem];
  }

  BOOL itemsChanged = ![_items isEqualToArray:items];
  if (itemsChanged) {
    _items = [items copy];
  }

  // Enabled state
  BOOL enabled = newProps.enabled;
  if (enabled != _enabled) {
    _enabled = enabled;
    _picker.enabled = _enabled;
  }

  // Color (global fallback for items without their own textColor)
  NSColor *color = newProps.color ? RCTUIColorFromSharedColor(newProps.color) : nil;
  BOOL colorChanged = NO;
  if (color != _color && (color == nil || ![color isEqual:_color])) {
    _color = color;
    colorChanged = YES;
  }

  // Text alignment
  BOOL alignChanged = NO;
  if (!newProps.textAlign.empty()) {
    NSTextAlignment newAlign = NSTextAlignmentLeft;
    std::string align = newProps.textAlign;
    if (align == "left") {
      newAlign = NSTextAlignmentLeft;
    } else if (align == "right") {
      newAlign = NSTextAlignmentRight;
    } else if (align == "center") {
      newAlign = NSTextAlignmentCenter;
    }
    if (newAlign != _textAlign) {
      _textAlign = newAlign;
      alignChanged = YES;
    }
  }

  // Font properties
  BOOL fontChanged = NO;
  NSString *fontFamily = RCTNSStringFromStringNilIfEmpty(newProps.fontFamily);
  CGFloat fontSize = newProps.fontSize > 0 ? (CGFloat)newProps.fontSize : [NSFont systemFontSize];

  NSFont *newFont = nil;
  if (fontFamily) {
    newFont = [NSFont fontWithName:fontFamily size:fontSize];
  }
  if (!newFont) {
    NSFontWeight weight = NSFontWeightRegular;
    if (!newProps.fontWeight.empty()) {
      std::string fw = newProps.fontWeight;
      if (fw == "bold" || fw == "700") {
        weight = NSFontWeightBold;
      } else if (fw == "100") {
        weight = NSFontWeightUltraLight;
      } else if (fw == "200") {
        weight = NSFontWeightThin;
      } else if (fw == "300") {
        weight = NSFontWeightLight;
      } else if (fw == "400" || fw == "normal") {
        weight = NSFontWeightRegular;
      } else if (fw == "500") {
        weight = NSFontWeightMedium;
      } else if (fw == "600") {
        weight = NSFontWeightSemibold;
      } else if (fw == "800") {
        weight = NSFontWeightHeavy;
      } else if (fw == "900") {
        weight = NSFontWeightBlack;
      }
    }
    newFont = [NSFont systemFontOfSize:fontSize weight:weight];
  }

  // Apply italic style
  if (!newProps.fontStyle.empty() && std::string(newProps.fontStyle) == "italic") {
    NSFontDescriptor *descriptor =
        [newFont.fontDescriptor fontDescriptorWithSymbolicTraits:NSFontDescriptorTraitItalic];
    NSFont *italicFont = [NSFont fontWithDescriptor:descriptor size:fontSize];
    if (italicFont) {
      newFont = italicFont;
    }
  }

  if (newFont && ![newFont isEqual:_font]) {
    _font = newFont;
    fontChanged = YES;
  }

  // Re-render items if any visual property changed
  if (itemsChanged || colorChanged || alignChanged || fontChanged) {
    [self _updatePickerItems];
  }

  // Selected index
  if (_selectedIndex != newProps.selectedIndex) {
    _selectedIndex = newProps.selectedIndex;
    if (_selectedIndex >= 0 && _selectedIndex < (NSInteger)_picker.numberOfItems) {
      [_picker selectItemAtIndex:_selectedIndex];
    }
  }

  // testID for accessibility/testing
  NSString *testID = RCTNSStringFromStringNilIfEmpty(newProps.testID);
  if (testID) {
    _picker.accessibilityIdentifier = testID;
  }

  [super updateProps:props oldProps:oldProps];
}

- (void)_updatePickerItems
{
  [_picker removeAllItems];
  _picker.font = _font;
  // Disable auto-enabling so we can manually control per-item enabled state
  [[_picker menu] setAutoenablesItems:NO];

  for (NSInteger i = 0; i < (NSInteger)_items.count; i++) {
    NSDictionary *item = _items[i];
    NSString *label = [item[@"label"] description] ?: @"";
    [_picker addItemWithTitle:label];

    NSMenuItem *menuItem = [_picker itemAtIndex:i];

    // Per-item enabled state
    BOOL itemEnabled = [item[@"enabled"] boolValue];
    menuItem.enabled = itemEnabled;

    // Build attributed title
    NSMutableDictionary *attributes = [NSMutableDictionary new];
    attributes[NSFontAttributeName] = _font;

    // Determine text color: item-specific > picker-level > system default
    NSColor *textColor = item[@"textColor"];
    if (textColor && [textColor isKindOfClass:[NSColor class]]) {
      attributes[NSForegroundColorAttributeName] = textColor;
    } else if (_color) {
      attributes[NSForegroundColorAttributeName] = _color;
    } else {
      attributes[NSForegroundColorAttributeName] = [NSColor controlTextColor];
    }

    if (_textAlign != NSTextAlignmentLeft) {
      NSMutableParagraphStyle *paragraphStyle = [[NSMutableParagraphStyle alloc] init];
      [paragraphStyle setAlignment:_textAlign];
      attributes[NSParagraphStyleAttributeName] = paragraphStyle;
    }

    menuItem.attributedTitle = [[NSAttributedString alloc] initWithString:label attributes:attributes];
  }

  if (_selectedIndex >= 0 && _selectedIndex < (NSInteger)_picker.numberOfItems) {
    [_picker selectItemAtIndex:_selectedIndex];
  }
}

- (void)_onChange:(NSPopUpButton *)sender
{
  NSInteger index = sender.indexOfSelectedItem;
  if (index < 0 || index >= (NSInteger)_items.count) {
    return;
  }

  id value = _items[index][@"value"];

  const auto &eventEmitter = static_cast<const RNCPickerEventEmitter &>(*_eventEmitter);
  RNCPickerEventEmitter::OnChange event;
  event.newIndex = (int)index;
  event.newValue = RNCPickerRNCPickerConvertIdToFollyDynamic(value);
  eventEmitter.onChange(event);
}

- (void)handleCommand:(const NSString *)commandName args:(const NSArray *)args
{
  RCTRNCPickerHandleCommand(self, commandName, args);
}

- (void)setNativeSelectedIndex:(NSInteger)selectedIndex
{
  _selectedIndex = selectedIndex;
  if (_selectedIndex >= 0 && _selectedIndex < (NSInteger)_picker.numberOfItems) {
    [_picker selectItemAtIndex:_selectedIndex];
  }
}

- (BOOL)shouldBeRecycled
{
  return NO;
}

@end

Class<RCTComponentViewProtocol> RNCPickerCls(void)
{
  return RNCPickerComponentView.class;
}
