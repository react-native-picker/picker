#include "pch.h"

#include "ReactPackageProvider.h"
#if __has_include("ReactPackageProvider.g.cpp")
#include "ReactPackageProvider.g.cpp"
#endif

#include "Picker.h"

using namespace winrt::Microsoft::ReactNative;

namespace winrt::Picker::implementation
{

void ReactPackageProvider::CreatePackage(IReactPackageBuilder const &packageBuilder) noexcept
{
  AddAttributedModules(packageBuilder, true);
  
  // Register Fabric component for new architecture
  PickerUserData::RegisterComponent(packageBuilder);
}

} // namespace winrt::Picker::implementation
