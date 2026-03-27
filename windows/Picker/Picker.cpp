#include "pch.h"
#include "Picker.h"

namespace winrt::Picker
{

// Native module for Picker
// The actual picker functionality is provided by the RNCPicker Fabric component (see RNCPickerComponentView.h/cpp)
// See https://microsoft.github.io/react-native-windows/docs/native-modules for details on writing native modules

void Picker::Initialize(React::ReactContext const &reactContext) noexcept {
  m_context = reactContext;
}

} // namespace winrt::Picker