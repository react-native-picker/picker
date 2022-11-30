#include "RNCAndroidDropdownPickerState.h"

namespace facebook
{
  namespace react
  {

#ifdef ANDROID
    folly::dynamic RNCAndroidDropdownPickerState::getDynamic() const
    {
      return folly::dynamic::object("selectedIndex", selectedIndex);
    }
#endif

  } // namespace react
} // namespace facebook
