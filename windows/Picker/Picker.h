#pragma once

#include "pch.h"
#include "resource.h"

#if __has_include("codegen/NativePickerDataTypes.g.h")
  #include "codegen/NativePickerDataTypes.g.h"
#endif
//#include "codegen/NativePickerSpec.g.h"

#include "NativeModules.h"
//#include "codegen/react/components/rnpicker/RNCPicker.g.h"
#include "codegen/react/components/rnpicker/RNCPickerWindows.g.h"

namespace winrt::Picker
{

// See https://microsoft.github.io/react-native-windows/docs/native-platform for help writing native modules

REACT_MODULE(Picker)
struct Picker
{
  REACT_INIT(Initialize)
  void Initialize(React::ReactContext const &reactContext) noexcept;

  REACT_SYNC_METHOD(multiply)
  double multiply(double a, double b) noexcept;

private:
  React::ReactContext m_context;
};

// Fabric component implementation for RNCPickerWindows
struct PickerUserData : winrt::implements<PickerUserData, winrt::IInspectable>,
                         ::Picker::BaseRNCPickerWindows<PickerUserData> {

  PickerUserData() = default;

  void UpdateProps(
      const winrt::Microsoft::ReactNative::ComponentView &view,
      const winrt::com_ptr<::Picker::RNCPickerWindowsProps> &newProps,
      const winrt::com_ptr<::Picker::RNCPickerWindowsProps> &oldProps) noexcept override;

  void UpdateLayoutMetrics(
      const winrt::Microsoft::ReactNative::ComponentView &view,
      const winrt::Microsoft::ReactNative::LayoutMetrics &newLayoutMetrics,
      const winrt::Microsoft::ReactNative::LayoutMetrics &oldLayoutMetrics) noexcept override;

  void Initialize(const winrt::Microsoft::ReactNative::ComponentView &view) noexcept override;

  winrt::Microsoft::UI::Composition::Visual CreateVisual(
      const winrt::Microsoft::ReactNative::ComponentView &view) noexcept override;

  void FinalizeUpdate(
      const winrt::Microsoft::ReactNative::ComponentView &view,
      winrt::Microsoft::ReactNative::ComponentViewUpdateMask mask) noexcept override;

  void HandleSetNativeSelectedIndexCommand(int32_t selectedIndex) noexcept override;

  static void RegisterComponent(
      const winrt::Microsoft::ReactNative::IReactPackageBuilder &packageBuilder) noexcept;

private:
  winrt::Microsoft::UI::Composition::SpriteVisual m_visual{nullptr};
  winrt::Microsoft::UI::Composition::CompositionBrush m_brush{nullptr};
};

} // namespace winrt::Picker