#pragma once

#include <react/renderer/components/rnpicker/Props.h>
#include <react/renderer/core/ConcreteComponentDescriptor.h>
#include <react/renderer/core/LayoutConstraints.h>
#include <react/utils/ContextContainer.h>
#include "RNCAndroidDropdownPickerState.h"
#include "conversions.h"

namespace facebook::react {

class RNCAndroidDropdownPickerMeasurementsManager {
 public:
  RNCAndroidDropdownPickerMeasurementsManager(
      const std::shared_ptr<const ContextContainer> &contextContainer)
      : contextContainer_(contextContainer) {}

  Size measure(
      SurfaceId surfaceId,
      LayoutConstraints layoutConstraints,
      const RNCAndroidDropdownPickerProps& props,
      RNCAndroidDropdownPickerState state) const;

 private:
  const std::shared_ptr<const ContextContainer> contextContainer_;
};

} // namespace facebook::react
