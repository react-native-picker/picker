#pragma once

#include "RNCAndroidDialogPickerState.h"
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

    JSI_EXPORT extern const char RNCAndroidDialogPickerComponentName[];

    class JSI_EXPORT RNCAndroidDialogPickerShadowNode final : public ConcreteViewShadowNode<
                                                                  RNCAndroidDialogPickerComponentName,
                                                                  RNCAndroidDialogPickerProps,
                                                                  RNCAndroidDialogPickerEventEmitter,
                                                                  RNCAndroidDialogPickerState>
    {
    public:
      void setMinHeight(float minHeight);
      using ConcreteViewShadowNode::ConcreteViewShadowNode;
    };

  } // namespace react
} // namespace facebook
