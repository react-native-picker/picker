// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

#pragma once

#include "pch.h"

#include "codegen_manual/react/components/RNCPickerSpec/RNCPicker.g.h"

#include <winrt/Microsoft.ReactNative.h>
#include <winrt/Microsoft.ReactNative.Composition.h>
#include <winrt/Microsoft.UI.Xaml.Controls.h>
#include <winrt/Microsoft.UI.Xaml.Controls.Primitives.h>
#include <winrt/Microsoft.UI.Xaml.h>
#include <limits>

namespace winrt::Picker::implementation {

// State to store the measured size
struct RNCPickerStateData : winrt::implements<RNCPickerStateData, winrt::IInspectable> {
  RNCPickerStateData(winrt::Windows::Foundation::Size ds) : desiredSize(ds) {}
  winrt::Windows::Foundation::Size desiredSize;
};

struct RNCPickerComponentView
    : winrt::implements<RNCPickerComponentView, winrt::IInspectable>,
      PickerCodegen::BaseRNCPicker<RNCPickerComponentView> {

  void InitializeContentIsland(
      const winrt::Microsoft::ReactNative::Composition::ContentIslandComponentView& islandView);

  void UpdateProps(
      const winrt::Microsoft::ReactNative::ComponentView& view,
      const winrt::com_ptr<PickerCodegen::RNCPickerProps>& newProps,
      const winrt::com_ptr<PickerCodegen::RNCPickerProps>& oldProps) noexcept override;

  void UpdateState(
      const winrt::Microsoft::ReactNative::ComponentView& view,
      const winrt::Microsoft::ReactNative::IComponentState& newState) noexcept override;

 private:
  void RefreshSize();
  void EmitPickerSelectEvent();

  winrt::weak_ref<winrt::Microsoft::ReactNative::Composition::ContentIslandComponentView> m_islandView;
  winrt::Microsoft::UI::Xaml::XamlIsland m_island{nullptr};
  winrt::Microsoft::UI::Xaml::Controls::ComboBox m_comboBox{nullptr};
  winrt::Microsoft::ReactNative::IComponentState m_state{nullptr};
  std::vector<PickerCodegen::RNCPickerSpec_RNCPickerProps_items> m_items;
  winrt::Microsoft::UI::Xaml::Controls::ComboBox::SelectionChanged_revoker m_selectionChangedRevoker;
  winrt::Microsoft::UI::Xaml::Controls::ComboBox::TextSubmitted_revoker m_textSubmittedRevoker;

  // RAII helper to temporarily suspend event handlers during programmatic updates.
  // This avoids triggering change events when we're setting values from props.
  template<typename TAction>
  void WithEventsSuspended(TAction action) {
    m_selectionChangedRevoker.revoke();
    m_textSubmittedRevoker.revoke();
    
    action();
    
    m_selectionChangedRevoker = m_comboBox.SelectionChanged(
        winrt::auto_revoke, [this](const auto& /*sender*/, const auto& /*args*/) {
          EmitPickerSelectEvent();
        });
    m_textSubmittedRevoker = m_comboBox.TextSubmitted(
        winrt::auto_revoke, [this](const auto& /*sender*/, const auto& /*args*/) {
          EmitPickerSelectEvent();
        });
  }
};

void RegisterRNCPickerComponentView(
    winrt::Microsoft::ReactNative::IReactPackageBuilder const& packageBuilder) noexcept;

} // namespace winrt::Picker::implementation




