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

      RNCAndroidDialogPickerState() : selectedIndex(-1){};
      RNCAndroidDialogPickerState(int selectedIndex_) : selectedIndex(selectedIndex_){};

#ifdef ANDROID
      RNCAndroidDialogPickerState(
          RNCAndroidDialogPickerState const &previousState,
          folly::dynamic data) : selectedIndex((int)data["selectedIndex"].getInt()){};
#endif

      const int selectedIndex;

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
