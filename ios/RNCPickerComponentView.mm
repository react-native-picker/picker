#ifdef RN_FABRIC_ENABLED

#import "RNCPickerComponentView.h"
#import "RNCPicker.h"

#import <React/RCTConversions.h>
#import <React/RCTFabricComponentsPlugins.h>
#import <react/renderer/components/rnpicker/ComponentDescriptors.h>
#import <react/renderer/components/rnpicker/Props.h>

using namespace facebook::react;

@implementation RNCPickerComponentView
{
    RNCPicker *picker;
}

+ (ComponentDescriptorProvider)componentDescriptorProvider
{
  return concreteComponentDescriptorProvider<RNCPickerComponentDescriptor>();
}

- (instancetype)initWithFrame:(CGRect)frame
{
    if (self = [super initWithFrame:frame]) {
        static const auto defaultProps = std::make_shared<const RNCPickerProps>();
        _props = defaultProps;
        picker = [[RNCPicker alloc] initWithFrame:self.bounds];
        self.contentView = picker;
    }
    return self;
}

//- (void)updateProps:(Props::Shared const &)props oldProps:(Props::Shared const &)oldProps
//{
//  const auto &newProps = *std::static_pointer_cast<const RNSVGClipPathProps>(props);
//  setCommonNodeProps(newProps, self);
//  _props = std::static_pointer_cast<RNSVGClipPathProps const>(props);
//}

@end

Class<RCTComponentViewProtocol> RNCPickerCls(void)
{
    return RNCPickerComponentView.class;
}

#endif
