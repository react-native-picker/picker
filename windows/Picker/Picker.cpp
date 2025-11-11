#include "pch.h"

#include "Picker.h"

namespace winrt::Picker
{

// See https://microsoft.github.io/react-native-windows/docs/native-platform for help writing native modules

void Picker::Initialize(React::ReactContext const &reactContext) noexcept {
  m_context = reactContext;
}

double Picker::multiply(double a, double b) noexcept {
  return a * b;
}

// Fabric component stub implementations for RNCPickerWindows

void PickerUserData::UpdateProps(
    const winrt::Microsoft::ReactNative::ComponentView &view,
    const winrt::com_ptr<::Picker::RNCPickerWindowsProps> &newProps,
    const winrt::com_ptr<::Picker::RNCPickerWindowsProps> &oldProps) noexcept {
  
    // Call base implementation
    BaseRNCPickerWindows::UpdateProps(view, newProps, oldProps);

    // TODO: Implement props update logic for RNCPickerWindows
    // Access props using: newProps->items, newProps->selectedIndex, newProps->enabled, newProps->placeholder, etc.
}

void PickerUserData::UpdateLayoutMetrics(
    const winrt::Microsoft::ReactNative::ComponentView &view,
    const winrt::Microsoft::ReactNative::LayoutMetrics &newLayoutMetrics,
    const winrt::Microsoft::ReactNative::LayoutMetrics &oldLayoutMetrics) noexcept {
  
    // TODO: Implement layout update logic
    if (m_visual) {
        m_visual.Size({newLayoutMetrics.Frame.Width, newLayoutMetrics.Frame.Height});
    }
}

void PickerUserData::Initialize(
    const winrt::Microsoft::ReactNative::ComponentView &view) noexcept {
  
    // TODO: Implement initialization logic for RNCPickerWindows component
}

winrt::Microsoft::UI::Composition::Visual PickerUserData::CreateVisual(
    const winrt::Microsoft::ReactNative::ComponentView &view) noexcept {
  
    // Create visual for the RNCPickerWindows component
    auto compositor = view.as<winrt::Microsoft::ReactNative::Composition::ComponentView>().Compositor();
    m_visual = compositor.CreateSpriteVisual();
  
    // TODO: Set up visual properties
    m_visual.Comment(L"RNCPickerWindows");
  
    return m_visual;
}

void PickerUserData::FinalizeUpdate(
    const winrt::Microsoft::ReactNative::ComponentView &view,
    winrt::Microsoft::ReactNative::ComponentViewUpdateMask mask) noexcept {
  
    // TODO: Implement finalize update logic
    // This is called after all updates are applied
}

void PickerUserData::HandleSetNativeSelectedIndexCommand(int32_t selectedIndex) noexcept {
  
    // TODO: Implement setNativeSelectedIndex command for RNCPickerWindows
    // This handles the setNativeSelectedIndex command from JavaScript (defined in PickerWindowsNativeComponent.js)
}

void PickerUserData::RegisterComponent(
    const winrt::Microsoft::ReactNative::IReactPackageBuilder &packageBuilder) noexcept {
  
    ::Picker::RegisterRNCPickerWindowsNativeComponent<PickerUserData>(
        packageBuilder,
        [](const winrt::Microsoft::ReactNative::Composition::IReactCompositionViewComponentBuilder &builder) noexcept {
            builder.SetViewComponentViewInitializer([](const winrt::Microsoft::ReactNative::Composition::ViewComponentViewInitializer &init) {
                // no-op here; builder customization can be done by caller
            });
        });
}

} // namespace winrt::Picker