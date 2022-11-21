#pragma once

#include <react/debug/react_native_assert.h>
#include "RNCAndroidDropdownPickerShadowNode.h"
#include <react/renderer/core/ConcreteComponentDescriptor.h>
#include <react/renderer/components/rnpicker/Props.h>

namespace facebook
{
    namespace react
    {

        class RNCAndroidDropdownPickerComponentDescriptor final
            : public ConcreteComponentDescriptor<RNCAndroidDropdownPickerShadowNode>
        {
        public:
            using ConcreteComponentDescriptor::ConcreteComponentDescriptor;

            void adopt(ShadowNode::Unshared const &shadowNode) const override
            {
                react_native_assert(
                    std::dynamic_pointer_cast<RNCAndroidDropdownPickerShadowNode>(shadowNode));
                auto screenShadowNode =
                    std::static_pointer_cast<RNCAndroidDropdownPickerShadowNode>(shadowNode);

                react_native_assert(
                    std::dynamic_pointer_cast<YogaLayoutableShadowNode>(screenShadowNode));
                auto layoutableShadowNode =
                    std::static_pointer_cast<YogaLayoutableShadowNode>(screenShadowNode);

                auto state =
                    std::static_pointer_cast<const RNCAndroidDropdownPickerShadowNode::ConcreteState>(
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
