#pragma once

#include "RNCAndroidDialogPickerState.h"
#include <react/renderer/components/rnpicker/EventEmitters.h>
#include <react/renderer/components/rnpicker/Props.h>
#include <react/renderer/components/view/ConcreteViewShadowNode.h>
#include <jsi/jsi.h>

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
      using ConcreteViewShadowNode::ConcreteViewShadowNode;

      static ShadowNodeTraits BaseTraits()
      {
        auto traits = ConcreteViewShadowNode::BaseTraits();
        traits.set(ShadowNodeTraits::Trait::RootNodeKind);
        return traits;
      }
    };

  } // namespace react
} // namespace facebook
