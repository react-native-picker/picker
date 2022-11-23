#include "RNCAndroidDialogPickerShadowNode.h"

namespace facebook
{
    namespace react
    {

        extern const char RNCAndroidDialogPickerComponentName[] = "RNCAndroidDialogPicker";

        void RNCAndroidDialogPickerShadowNode::setMinHeight(float minHeight)
        {
            // borrowed from react-native/ReactCommon/react/renderer/components/view/YogaLayoutableShadowNode.cpp ::setSize
            ensureUnsealed();
            auto style = yogaNode_.getStyle();
            style.minDimensions()[YGDimensionHeight] = yogaStyleValueFromFloat(minHeight);
            yogaNode_.setStyle(style);
            yogaNode_.setDirty(true);
        }
    } // namespace react
} // namespace facebook
