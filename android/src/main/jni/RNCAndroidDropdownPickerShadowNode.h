#pragma once

#include "RNCAndroidDropdownPickerState.h"
#include <react/renderer/components/rnpicker/EventEmitters.h>
#include <react/renderer/components/rnpicker/Props.h>
#include <react/renderer/components/view/ConcreteViewShadowNode.h>
#include <jsi/jsi.h>
#include <yoga/Yoga.h>
#include <react/renderer/components/view/conversions.h>

namespace facebook
{
  namespace react
  {

    JSI_EXPORT extern const char RNCAndroidDropdownPickerComponentName[];

    class JSI_EXPORT RNCAndroidDropdownPickerShadowNode final : public ConcreteViewShadowNode<
                                                                    RNCAndroidDropdownPickerComponentName,
                                                                    RNCAndroidDropdownPickerProps,
                                                                    RNCAndroidDropdownPickerEventEmitter,
                                                                    RNCAndroidDropdownPickerState>
    {
    public:
      void setMinHeight(float minHeight);
      using ConcreteViewShadowNode::ConcreteViewShadowNode;
    };

  } // namespace react
} // namespace facebook
