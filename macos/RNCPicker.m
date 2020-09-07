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
        [self selectItemAtIndex:0];
        [[self menu] setFont:_font];
        self.pullsDown = false;
        [self setAction:@selector(mySelector:)];
        [self setTarget:self];

    }
    return self;
}

- (void)setItems:(NSArray<NSDictionary *> *)items
{
    _items = [items copy];
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
    _selectedIndex = selectedIndex;
    dispatch_async(dispatch_get_main_queue(), ^{
        [self setSelectedIndex:selectedIndex];
    });
  }
}


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
