#include "pch.h"

#include "ReactPackageProvider.h"
#if __has_include("ReactPackageProvider.g.cpp")
#include "ReactPackageProvider.g.cpp"
#endif

#include "Picker.h"
#include "RNCPickerComponentView.h"

using namespace winrt::Microsoft::ReactNative;

namespace winrt::Picker::implementation
{

void ReactPackageProvider::CreatePackage(IReactPackageBuilder const &packageBuilder) noexcept
{
  AddAttributedModules(packageBuilder, true);
  RegisterRNCPickerComponentView(packageBuilder);
}

} // namespace winrt::Picker::implementation
