#include "RNCAndroidDropdownPickerState.h"

namespace facebook
{
  namespace react
  {

#ifdef ANDROID
    folly::dynamic RNCAndroidDropdownPickerState::getDynamic() const
    {
      return folly::dynamic::object("minHeight", minHeight);
    }
#endif

  } // namespace react
} // namespace facebook
