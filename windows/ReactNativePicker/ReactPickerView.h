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
        int32_t m_selectedIndex{ 0 };
        std::vector<winrt::hstring> m_itemValues;
        winrt::Windows::UI::Xaml::Media::Brush m_comboBoxColor{ nullptr };
        winrt::Windows::UI::Xaml::Controls::ComboBox::SelectionChanged_revoker m_selectionChangedRevoker{};
        winrt::Windows::UI::Xaml::Controls::ComboBox::DropDownClosed_revoker m_dropDownClosedRevoker{};

        void RegisterEvents();
        void RepopulateItems(winrt::Microsoft::ReactNative::JSValueArray const& items);
        void SetSelectedIndex(int index);
        void OnSelectionChanged(winrt::Windows::Foundation::IInspectable const& sender, winrt::Windows::UI::Xaml::Controls::SelectionChangedEventArgs const& args);
        void UpdateComboBoxItemForegroundResource(winrt::Windows::UI::Xaml::FrameworkElement const& item, winrt::Windows::UI::Xaml::Media::Brush const& color);
    };
} // namespace winrt::ReactNativePicker::implementation

namespace winrt::ReactNativePicker::factory_implementation {
    struct ReactPickerView : ReactPickerViewT<ReactPickerView, implementation::ReactPickerView> {};
} // namespace winrt::ReactNativePicker::factory_implementation