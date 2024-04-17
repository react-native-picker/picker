#include "pch.h"
#include "ReactPackageProvider.h"
#if __has_include("ReactPackageProvider.g.cpp")
#include "ReactPackageProvider.g.cpp"
#endif
#include "ReactPickerViewManager.h"

using namespace winrt::Microsoft::ReactNative;

namespace winrt::ReactNativePicker::implementation
{

void ReactPackageProvider::CreatePackage(IReactPackageBuilder const &packageBuilder) noexcept
{
    packageBuilder.AddViewManager(L"ReactPickerViewManager", []() { return winrt::make<ReactPickerViewManager>(); });
}

} // namespace winrt::ReactNativePicker::implementation
