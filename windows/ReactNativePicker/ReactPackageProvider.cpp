#include "pch.h"
#include "ReactPackageProvider.h"
#include "ReactPackageProvider.g.cpp"
#include "ReactPickerViewManager.h"

using namespace winrt::Microsoft::ReactNative;

namespace winrt::ReactNativePicker::implementation {

    void ReactPackageProvider::CreatePackage(IReactPackageBuilder const& packageBuilder) noexcept {
        packageBuilder.AddViewManager(L"ReactPickerViewManager", []() { return winrt::make<ReactPickerViewManager>(); });
    }

} // namespace winrt::ReactNativePicker::implementation
