#pragma once

#include <react/debug/react_native_assert.h>
#include "RNCAndroidDialogPickerShadowNode.h"
#include <react/renderer/core/ConcreteComponentDescriptor.h>
#include <react/renderer/components/rnpicker/Props.h>

namespace facebook
{
    namespace react
    {

        class RNCAndroidDialogPickerComponentDescriptor final
            : public ConcreteComponentDescriptor<RNCAndroidDialogPickerShadowNode>
        {
        public:
            using ConcreteComponentDescriptor::ConcreteComponentDescriptor;

            void adopt(ShadowNode::Unshared const &shadowNode) const override
            {
                react_native_assert(
                    std::dynamic_pointer_cast<RNCAndroidDialogPickerShadowNode>(shadowNode));
                auto screenShadowNode =
                    std::static_pointer_cast<RNCAndroidDialogPickerShadowNode>(shadowNode);

                react_native_assert(
                    std::dynamic_pointer_cast<YogaLayoutableShadowNode>(screenShadowNode));
                auto layoutableShadowNode =
                    std::static_pointer_cast<YogaLayoutableShadowNode>(screenShadowNode);

                auto state =
                    std::static_pointer_cast<const RNCAndroidDialogPickerShadowNode::ConcreteState>(
                        shadowNode->getState());
                auto stateData = state->getData();

                if (stateData.minHeight != 0)
                {
                    screenShadowNode->setMinHeight(stateData.minHeight);
                }

                ConcreteComponentDescriptor::adopt(shadowNode);
            }
        };

    } // namespace react
} // namespace facebook
