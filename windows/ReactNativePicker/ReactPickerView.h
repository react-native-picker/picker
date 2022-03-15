// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

#pragma once

#include "ReactPickerView.g.h"
#include "winrt/Microsoft.ReactNative.h"
#include "NativeModules.h"

namespace winrt::ReactNativePicker::implementation {

    class ReactPickerView : public ReactPickerViewT<ReactPickerView> {
    public:
        ReactPickerView(Microsoft::ReactNative::IReactContext const& reactContext);
        void UpdateProperties(Microsoft::ReactNative::IJSValueReader const& reader);

    private:
        static const bool s_isEditableComboboxSupported;

        Microsoft::ReactNative::IReactContext m_reactContext{ nullptr };
        bool m_updating{ false };
        // FUTURE: remove when we can require RS5+
        int32_t m_selectedIndex{ -1 };
        std::vector<winrt::hstring> m_itemValues;
        xaml::Media::Brush m_comboBoxColor{ nullptr };
        xaml::Controls::ComboBox::SelectionChanged_revoker m_selectionChangedRevoker{};
        xaml::Controls::ComboBox::DropDownClosed_revoker m_dropDownClosedRevoker{};
        xaml::Controls::ComboBox::DropDownOpened_revoker m_dropDownOpenedRevoker{};

        void RegisterEvents();
        void RepopulateItems(winrt::Microsoft::ReactNative::JSValueArray const& items);
        void SetSelectedIndex(int index);
        void OnSelectionChanged(winrt::Windows::Foundation::IInspectable const& sender, xaml::Controls::SelectionChangedEventArgs const& args);
        void UpdateComboBoxItemForegroundResource(xaml::FrameworkElement const& item, xaml::Media::Brush const& color);
    };
} // namespace winrt::ReactNativePicker::implementation

namespace winrt::ReactNativePicker::factory_implementation {
    struct ReactPickerView : ReactPickerViewT<ReactPickerView, implementation::ReactPickerView> {};
} // namespace winrt::ReactNativePicker::factory_implementation