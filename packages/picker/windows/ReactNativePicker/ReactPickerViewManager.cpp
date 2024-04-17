// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

#include "pch.h"
#include "ReactPickerViewManager.h"
#include "NativeModules.h"
#include "ReactPickerView.h"

namespace winrt {
    using namespace Microsoft::ReactNative;
    using namespace Windows::Foundation::Collections;
    using namespace xaml;
}

namespace winrt::ReactNativePicker::implementation {

    ReactPickerViewManager::ReactPickerViewManager() {}

    // IViewManager
    winrt::hstring ReactPickerViewManager::Name() noexcept {
        return L"RNCPicker";
    }

    winrt::FrameworkElement ReactPickerViewManager::CreateView() noexcept {
        return winrt::ReactNativePicker::ReactPickerView(m_reactContext);
    }

    // IViewManagerWithReactContext
    winrt::IReactContext ReactPickerViewManager::ReactContext() noexcept {
        return m_reactContext;
    }

    void ReactPickerViewManager::ReactContext(IReactContext reactContext) noexcept {
        m_reactContext = reactContext;
    }

    // IViewManagerWithNativeProperties
    IMapView<hstring, ViewManagerPropertyType> ReactPickerViewManager::NativeProps() noexcept {
        auto nativeProps = winrt::single_threaded_map<hstring, ViewManagerPropertyType>();
        nativeProps.Insert(L"editable", ViewManagerPropertyType::Boolean);
        nativeProps.Insert(L"enabled", ViewManagerPropertyType::Boolean);
        nativeProps.Insert(L"items", ViewManagerPropertyType::Array);
        nativeProps.Insert(L"placeholder", ViewManagerPropertyType::String);
        nativeProps.Insert(L"selectedIndex", ViewManagerPropertyType::Number);
        nativeProps.Insert(L"text", ViewManagerPropertyType::String);
        return nativeProps.GetView();
    }

    void ReactPickerViewManager::UpdateProperties(
        FrameworkElement const& view,
        IJSValueReader const& propertyMapReader) noexcept {
        if (auto pickerView = view.try_as<ReactPickerView>()) {
            pickerView->UpdateProperties(propertyMapReader);
        }
    }

    // IViewManagerWithExportedEventTypeConstants
    ConstantProviderDelegate ReactPickerViewManager::ExportedCustomBubblingEventTypeConstants() noexcept {
        return nullptr;
    }

    ConstantProviderDelegate ReactPickerViewManager::ExportedCustomDirectEventTypeConstants() noexcept {
        return [](winrt::IJSValueWriter const& constantWriter) {
            WriteCustomDirectEventTypeConstant(constantWriter, "onChange");
        };
    }

} // namespace winrt::ReactNativePicker::implementation