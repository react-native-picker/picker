// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

#include "pch.h"
#include "JSValueXaml.h"
#include "ReactPickerView.h"
#include "ReactPickerView.g.cpp"

#include <winrt/Windows.Foundation.Metadata.h>
#include <UI.Xaml.Input.h>
#include <UI.Xaml.Media.h>

namespace winrt {
    using namespace Microsoft::ReactNative;
    using namespace Windows::Foundation;
    using namespace Windows::Foundation::Metadata;
    using namespace xaml;
    using namespace xaml::Controls;
    using namespace xaml::Input;
    using namespace xaml::Media;
} // namespace winrt

namespace winrt::ReactNativePicker::implementation {

#ifdef USE_WINUI3
    const bool ReactPickerView::s_isEditableComboboxSupported = true;
#else
    const bool ReactPickerView::s_isEditableComboboxSupported = winrt::ApiInformation::IsPropertyPresent(
         L"Windows.UI.Xaml.Controls.ComboBox", L"IsEditableProperty");
#endif

    ReactPickerView::ReactPickerView(winrt::IReactContext const& reactContext) : m_reactContext(reactContext) {
        this->AllowFocusOnInteraction(true);
        RegisterEvents();
    }

    void ReactPickerView::RegisterEvents() {
        m_selectionChangedRevoker = this->SelectionChanged(winrt::auto_revoke,
            [ref = get_weak()](auto const& sender, auto const& args) {
            if (auto self = ref.get()) {
                self->OnSelectionChanged(sender, args);
            }
        });

        m_dropDownClosedRevoker = this->DropDownClosed(winrt::auto_revoke,
            [](auto const& sender, auto const& /*args*/) {
                // When the drop down closes, move focus to the textbox inside ComboBox
                // to prevent cases where focus can land on an outer flyout
                // content and trigger an unexpected flyout dismissal
                if (auto comboBox = sender.try_as<winrt::ComboBox>()) {
                    winrt::FocusManager::TryFocusAsync(comboBox, winrt::FocusState::Programmatic);
                }
            });

        // Workaround XAML bug with ComboBox and dark theme. Same as:
        // https://github.com/microsoft/microsoft-ui-xaml/issues/2331    
        m_dropDownOpenedRevoker = this->DropDownOpened(winrt::auto_revoke,
            [](auto const& sender, auto const& /*args*/) {
            auto comboBox = sender.as<xaml::Controls::ComboBox>();
            if (comboBox.XamlRoot()) { // XamlRoot added in 19H1
                auto comboBoxAsFrameworkElement = comboBox.XamlRoot().Content().try_as<xaml::FrameworkElement>();
                auto popups = xaml::Media::VisualTreeHelper::GetOpenPopupsForXamlRoot(comboBox.XamlRoot());
                for (auto const& popup : popups) {
                    popup.Child().as<xaml::FrameworkElement>().RequestedTheme(comboBoxAsFrameworkElement.ActualTheme());
                }
            }
        });
    }

    void ReactPickerView::UpdateProperties(winrt::IJSValueReader const& reader) {
        m_updating = true;
        bool updateSelectedIndex = false;
        auto const& propertyMap = JSValueObject::ReadFrom(reader);

        for (auto const& pair : propertyMap) {
            auto const& propertyName = pair.first;
            auto const& propertyValue = pair.second;

            if (propertyName == "editable") {
                if (s_isEditableComboboxSupported) {
                    if (propertyValue.IsNull()) {
                        this->ClearValue(winrt::ComboBox::IsEditableProperty());
                    }
                    else {
#ifdef USE_WINUI3
                         this->IsEditable(propertyValue.AsBoolean());
#else
                         if (auto iComboBox6 = this->try_as<winrt::Controls::IComboBox6>()) {
                             iComboBox6.IsEditable(propertyValue.AsBoolean());
                         }
#endif
                    }
                }
            }
            else if (propertyName == "text") {
                if (s_isEditableComboboxSupported) {
                    if (propertyValue.IsNull()) {
                        this->ClearValue(winrt::ComboBox::TextProperty());
                    }
                    else {
                        this->Text(to_hstring(propertyValue.AsString()));
                    }
                }
            }
            else if (propertyName == "enabled") {
                this->IsEnabled(propertyValue.AsBoolean());
            }
            else if (propertyName == "selectedIndex") {
                auto selectedIndex = propertyValue.AsInt64();
                if (selectedIndex == static_cast<int32_t>(selectedIndex)) {
                    m_selectedIndex = static_cast<int32_t>(selectedIndex);
                }
                updateSelectedIndex = true;
            }
            else if (propertyName == "items") {
                RepopulateItems(propertyValue.AsArray());
            }
            else if (propertyName == "placeholder") {
                if (propertyValue.IsNull()) {
                    this->ClearValue(winrt::ComboBox::PlaceholderTextProperty());
                }
                else {
                    this->PlaceholderText(to_hstring(propertyValue.AsString()));
                }
            }
            else if (propertyName == "backgroundColor") {
                auto const color = propertyValue.To<winrt::Brush>();
                auto res = this->Resources();
                res.Insert(box_value(L"ComboBoxBackground"), color);
                res.Insert(box_value(L"ComboBoxBackgroundPointerOver"), color);
            }
            else if (propertyName == "color") {
                m_comboBoxColor = propertyValue.To<winrt::Brush>();
                this->Foreground(m_comboBoxColor);
                UpdateComboBoxItemForegroundResource(*this, m_comboBoxColor);
            }
            else if (propertyName == "fontSize") {
                this->FontSize(propertyValue.AsDouble());
            }
        }

        // Update selectedIndex last, in case items and selectedIndex were both changing
        if (updateSelectedIndex) {
            SetSelectedIndex(m_selectedIndex);
        }
        m_updating = false;
    }

    void ReactPickerView::RepopulateItems(winrt::JSValueArray const& items) {
        auto comboBoxItems = this->Items();
        comboBoxItems.Clear();
        m_itemValues.clear();
        for (const auto& item : items) {
            auto& labelObject = item.GetObjectProperty("label");
            if (!labelObject.IsNull()) {
                auto comboBoxItem = winrt::ComboBoxItem();
                auto label = to_hstring(labelObject.AsString());
                comboBoxItem.Content(winrt::box_value(label));

                const auto& textColorObject = item.GetObjectProperty("textColor");
                if (!textColorObject.IsNull()) {
                    UpdateComboBoxItemForegroundResource(comboBoxItem, textColorObject.To<winrt::Brush>());
                }
                else if(m_comboBoxColor) {
                    UpdateComboBoxItemForegroundResource(comboBoxItem, m_comboBoxColor);
                }

                const auto& valueObject = item.GetObjectProperty("value");
                if (!valueObject.IsNull()) {
                    m_itemValues.emplace_back(to_hstring(valueObject.AsString()));
                }

                comboBoxItems.Append(comboBoxItem);
            }
        }

        SetSelectedIndex(m_selectedIndex);
    }

    void ReactPickerView::SetSelectedIndex(int index) {
        if (index>=0 && index < static_cast<int32_t>(this->Items().Size())) {
            this->SelectedIndex(index);
            // If picker.color is not set, use Picker.Item.color as the foreground color.
            if (!m_comboBoxColor) {
                if (auto selectedItem = this->SelectedItem().try_as<winrt::ComboBoxItem>()) {
                    this->Foreground(selectedItem.Foreground());
                }
            }
        }
        else {
            OutputDebugString(L"ReactPickerView::SetSelectedIndex, index out of range.\n");
        }
    }

    void ReactPickerView::OnSelectionChanged(winrt::IInspectable const& /*sender*/, winrt::SelectionChangedEventArgs const& /*args*/) {
        if (!m_updating) {
            int index = this->SelectedIndex();

            winrt::hstring value;
            if (index >= 0 && index < static_cast<int32_t>(m_itemValues.size())) {
                value = m_itemValues[index];
            }

            winrt::hstring text;
            if (s_isEditableComboboxSupported && index == -1) {
                text = this->Text();
            }

            m_reactContext.DispatchEvent(
                *this,
                L"topChange",
                [&](winrt::Microsoft::ReactNative::IJSValueWriter const& eventDataWriter) noexcept {
                    eventDataWriter.WriteObjectBegin();
                    {
                        WriteProperty(eventDataWriter, L"value", value);
                        WriteProperty(eventDataWriter, L"itemIndex", index);
                        WriteProperty(eventDataWriter, L"text", text);
                    }
                    eventDataWriter.WriteObjectEnd();
                });
        }
    }

    void ReactPickerView::UpdateComboBoxItemForegroundResource(winrt::FrameworkElement const& item, xaml::Media::Brush const& color) {
        if (auto comboBoxItem = item.try_as<winrt::ComboBoxItem>()) {
            comboBoxItem.Foreground(color);
        }
        auto res = item.Resources();
        res.Insert(box_value(L"ComboBoxItemForeground"), color);
        res.Insert(box_value(L"ComboBoxItemForegroundPointerOver"), color);
        res.Insert(box_value(L"ComboBoxItemForegroundDisabled"), color);
        res.Insert(box_value(L"ComboBoxItemForegroundPressed"), color);
        res.Insert(box_value(L"ComboBoxItemForegroundSelected"), color);
        res.Insert(box_value(L"ComboBoxItemForegroundSelectedUnfocused"), color);
        res.Insert(box_value(L"ComboBoxItemForegroundSelectedDisabled"), color);
        res.Insert(box_value(L"ComboBoxItemForegroundSelectedPointerOver"), color);
        res.Insert(box_value(L"ComboBoxItemForegroundSelectedPressed"), color);
    }

} // namespace winrt::ReactNativePicker::implementation