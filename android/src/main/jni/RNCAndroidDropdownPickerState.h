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

    class JSI_EXPORT RNCAndroidDropdownPickerState final
    {
    public:
      using Shared = std::shared_ptr<const RNCAndroidDropdownPickerState>;

      RNCAndroidDropdownPickerState() : minHeight(0){};
      RNCAndroidDropdownPickerState(float minHeight_) : minHeight(minHeight_){};

#ifdef ANDROID
      RNCAndroidDropdownPickerState(
          RNCAndroidDropdownPickerState const &previousState,
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
