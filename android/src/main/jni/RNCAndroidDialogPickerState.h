#pragma once

#include <react/renderer/graphics/Float.h>
#include <react/renderer/graphics/Geometry.h>
#include <react/renderer/graphics/conversions.h>

#ifdef ANDROID
#include <folly/dynamic.h>
#include <react/renderer/mapbuffer/MapBuffer.h>
#include <react/renderer/mapbuffer/MapBufferBuilder.h>
#endif

namespace facebook
{
  namespace react
  {

    class JSI_EXPORT RNCAndroidDialogPickerState final
    {
    public:
      using Shared = std::shared_ptr<const RNCAndroidDialogPickerState>;

      RNCAndroidDialogPickerState() : minHeight(0){};
      RNCAndroidDialogPickerState(float minHeight_) : minHeight(minHeight_){};

#ifdef ANDROID
      RNCAndroidDialogPickerState(
          RNCAndroidDialogPickerState const &previousState,
          folly::dynamic data) : minHeight((Float)data["minHeight"].getDouble()){};
#endif

      const float minHeight;

#ifdef ANDROID
      folly::dynamic getDynamic() const;
      MapBuffer getMapBuffer() const
      {
        return MapBufferBuilder::EMPTY();
      };

#endif

#pragma mark - Getters
    };

  } // namespace react
} // namespace facebook
