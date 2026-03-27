// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

#include "pch.h"
#include "RNCPickerComponentView.h"
#include <limits>

namespace winrt::Picker::implementation {

void RegisterRNCPickerComponentView(
  winrt::Microsoft::ReactNative::IReactPackageBuilder const &packageBuilder) noexcept {
  PickerCodegen::RegisterRNCPickerNativeComponent<winrt::Picker::implementation::RNCPickerComponentView>(
    packageBuilder,
    [](const winrt::Microsoft::ReactNative::Composition::IReactCompositionViewComponentBuilder &builder) {
      builder.as<winrt::Microsoft::ReactNative::IReactViewComponentBuilder>().XamlSupport(true);
      // Use SetContentIslandComponentViewInitializer
      builder.SetContentIslandComponentViewInitializer(
        [](const winrt::Microsoft::ReactNative::Composition::ContentIslandComponentView &islandView) noexcept {
          const auto userData = winrt::make_self<winrt::Picker::implementation::RNCPickerComponentView>();
          userData->InitializeContentIsland(islandView);
          islandView.UserData(*userData);
        });
      // Set up initial state with zero size
      builder.as<winrt::Microsoft::ReactNative::IReactViewComponentBuilder>().SetInitialStateDataFactory(
        [](const winrt::Microsoft::ReactNative::IComponentProps& /*props*/) noexcept {
          return winrt::make<RNCPickerStateData>(winrt::Windows::Foundation::Size{ 0, 0 });
        });

      // Register the measure function - reads from state
      builder.as<winrt::Microsoft::ReactNative::IReactViewComponentBuilder>().SetMeasureContentHandler(
        [](winrt::Microsoft::ReactNative::ShadowNode const& shadowNode,
           winrt::Microsoft::ReactNative::LayoutContext const& ,
           winrt::Microsoft::ReactNative::LayoutConstraints const&) noexcept {

          const auto currentState = winrt::get_self<RNCPickerStateData>(shadowNode.StateData());

          if (currentState && currentState->desiredSize.Width > 0) {
            // Return the measured size from state
            return currentState->desiredSize;
          }

          // Return a default size if we don't have a measurement yet
          return winrt::Windows::Foundation::Size{ 100, 32 };
        });

      // Handle state updates
      builder.as<winrt::Microsoft::ReactNative::IReactViewComponentBuilder>().SetUpdateStateHandler(
        [](const winrt::Microsoft::ReactNative::ComponentView& view,
           const winrt::Microsoft::ReactNative::IComponentState& newState) {
          const auto islandView = view.as<winrt::Microsoft::ReactNative::Composition::ContentIslandComponentView>();
          const auto userData = islandView.UserData().as<winrt::Picker::implementation::RNCPickerComponentView>();
          userData->UpdateState(view, newState);
        });
    });
}

void RNCPickerComponentView::InitializeContentIsland(
  const winrt::Microsoft::ReactNative::Composition::ContentIslandComponentView &islandView) {
  // Create ComboBox for picker functionality
  m_comboBox = winrt::Microsoft::UI::Xaml::Controls::ComboBox();
  m_comboBox.HorizontalAlignment(
    winrt::Microsoft::UI::Xaml::HorizontalAlignment::Stretch);
  
  // For editable ComboBox, trigger selection change always (not just on commit)
  m_comboBox.SelectionChangedTrigger(
    winrt::Microsoft::UI::Xaml::Controls::ComboBoxSelectionChangedTrigger::Always);

  // Listen for size changes on the comboBox
  m_comboBox.SizeChanged([this](auto const& /*sender*/, auto const& /*args*/) {
    RefreshSize();
  });

  // Listen for selection changes
  m_selectionChangedRevoker = m_comboBox.SelectionChanged(
      winrt::auto_revoke, [this](const auto& /*sender*/, const auto& /*args*/) {
        EmitPickerSelectEvent();
      });

  // Listen for text submitted (when user presses Enter in editable mode)
  m_textSubmittedRevoker = m_comboBox.TextSubmitted(
      winrt::auto_revoke, [this](const auto& /*sender*/, const auto& /*args*/) {
        EmitPickerSelectEvent();
      });

  m_island = winrt::Microsoft::UI::Xaml::XamlIsland{};
  m_island.Content(m_comboBox);
  islandView.Connect(m_island.ContentIsland());
  m_islandView = winrt::make_weak(islandView);
}

void RNCPickerComponentView::EmitPickerSelectEvent() {
  if (auto eventEmitter = this->EventEmitter()) {
    const int32_t selectedIndex = m_comboBox.SelectedIndex();

    PickerCodegen::RNCPicker_OnPickerSelect eventArgs;
    eventArgs.itemIndex = selectedIndex;
    
    // Get the selected item value and text if available
    if (selectedIndex >= 0 && selectedIndex < static_cast<int32_t>(m_items.size())) {
      eventArgs.value = m_items[selectedIndex].value.value_or("");
      eventArgs.text = m_items[selectedIndex].label;
    } else {
      // In editable mode, user may have typed custom text
      // Get the text from the ComboBox
      eventArgs.text = winrt::to_string(m_comboBox.Text());
      eventArgs.value = eventArgs.text;
    }
    
    eventEmitter->onPickerSelect(eventArgs);
  }
}

void RNCPickerComponentView::UpdateProps(
    const winrt::Microsoft::ReactNative::ComponentView& view,
    const winrt::com_ptr<PickerCodegen::RNCPickerProps>& newProps,
    const winrt::com_ptr<PickerCodegen::RNCPickerProps>& oldProps) noexcept {
  BaseRNCPicker::UpdateProps(view, newProps, oldProps);

  // Suspend event handlers during programmatic updates to avoid triggering
  // change events. Using RAII ensures handlers are always re-attached.
  WithEventsSuspended([&]() {
    // Update enabled state only if changed
    if (!oldProps || oldProps->enabled != newProps->enabled) {
      m_comboBox.IsEnabled(newProps->enabled);
    }

    // Update editable state only if changed
    if (!oldProps || oldProps->editable != newProps->editable) {
      m_comboBox.IsEditable(newProps->editable);
    }

    // Update placeholder text only if changed
    if (!oldProps || oldProps->placeholder != newProps->placeholder) {
      if (newProps->placeholder.has_value()) {
        m_comboBox.PlaceholderText(winrt::to_hstring(newProps->placeholder.value()));
      } else {
        m_comboBox.PlaceholderText(L"");
      }
    }

    // Update items if changed, OR if editable state changed (since item format differs)
    const bool editableChanged = !oldProps || oldProps->editable != newProps->editable;
    if (editableChanged || !oldProps || oldProps->items != newProps->items) {
      m_comboBox.Items().Clear();
      m_items.clear();

      for (const auto& item : newProps->items) {
        // Store item data
        m_items.push_back(item);

        // For editable ComboBox, add items as strings for proper autocomplete behavior
        // For non-editable, use ComboBoxItem for testID support
        if (newProps->editable) {
          m_comboBox.Items().Append(winrt::box_value(winrt::to_hstring(item.label)));
        } else {
          auto comboBoxItem = winrt::Microsoft::UI::Xaml::Controls::ComboBoxItem();
          comboBoxItem.Content(winrt::box_value(winrt::to_hstring(item.label)));

          // Set testID if provided
          if (item.testID.has_value()) {
            comboBoxItem.Name(winrt::to_hstring(item.testID.value()));
          }

          m_comboBox.Items().Append(comboBoxItem);
        }
      }
    }

    // Update selected index only if changed
    if (!oldProps || oldProps->selectedIndex != newProps->selectedIndex) {
      const int32_t selectedIndex = newProps->selectedIndex;
      if (selectedIndex >= 0 && selectedIndex < static_cast<int32_t>(m_comboBox.Items().Size())) {
        m_comboBox.SelectedIndex(selectedIndex);
      } else {
        m_comboBox.SelectedIndex(-1);
      }
    }

    // Update text (for editable mode) only if changed
    // Only set custom text when no item is selected (user typed custom text)
    if (!oldProps || oldProps->text != newProps->text) {
      if (newProps->editable && newProps->text.has_value() && newProps->selectedIndex < 0) {
        m_comboBox.Text(winrt::to_hstring(newProps->text.value()));
      }
    }
  });

  RefreshSize();
}

// Measure comboBox with new content and update state if needed.
void RNCPickerComponentView::RefreshSize() {
  m_comboBox.Measure(winrt::Windows::Foundation::Size{
      std::numeric_limits<float>::infinity(),
      std::numeric_limits<float>::infinity()
    });

  const auto desiredSize = m_comboBox.DesiredSize();

  if (m_state) {
    const auto currentState = winrt::get_self<RNCPickerStateData>(m_state.Data());
    if (desiredSize != currentState->desiredSize) {
      m_state.UpdateStateWithMutation([desiredSize](winrt::Windows::Foundation::IInspectable /*data*/) {
        return winrt::make<RNCPickerStateData>(desiredSize);
      });
    }
  }
}

void RNCPickerComponentView::UpdateState(
  const winrt::Microsoft::ReactNative::ComponentView& /*view*/,
  const winrt::Microsoft::ReactNative::IComponentState& newState) noexcept {
  m_state = newState;
}

} // namespace winrt::Picker::implementation