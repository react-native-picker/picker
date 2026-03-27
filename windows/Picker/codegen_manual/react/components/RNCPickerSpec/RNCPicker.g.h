
/*
 * This file is auto-generated from RNCPickerNativeComponent spec file in flow / TypeScript.
 */
// clang-format off
#pragma once

#include <NativeModules.h>
#include <JSValueComposition.h>

#include <winrt/Microsoft.ReactNative.Composition.h>
#include <winrt/Microsoft.UI.Composition.h>

namespace PickerCodegen {

REACT_STRUCT(RNCPickerSpec_RNCPickerProps_items)
struct RNCPickerSpec_RNCPickerProps_items {
  REACT_FIELD(label)
  std::string label;

  REACT_FIELD(value)
  std::optional<std::string> value;

  REACT_FIELD(textColor)
  winrt::Microsoft::ReactNative::Color textColor{nullptr};

  REACT_FIELD(testID)
  std::optional<std::string> testID;

  bool operator==(const RNCPickerSpec_RNCPickerProps_items& other) const noexcept {
    return label == other.label && value == other.value && testID == other.testID;
    // Note: textColor comparison omitted as Color doesn't have operator==
  }

  bool operator!=(const RNCPickerSpec_RNCPickerProps_items& other) const noexcept {
    return !(*this == other);
  }
};

REACT_STRUCT(RNCPickerProps)
struct RNCPickerProps : winrt::implements<RNCPickerProps, winrt::Microsoft::ReactNative::IComponentProps> {
  RNCPickerProps(winrt::Microsoft::ReactNative::ViewProps props, const winrt::Microsoft::ReactNative::IComponentProps& cloneFrom)
    : ViewProps(props)
  {
     if (cloneFrom) {
       auto cloneFromProps = cloneFrom.as<RNCPickerProps>();
       items = cloneFromProps->items;
       selectedIndex = cloneFromProps->selectedIndex;
       enabled = cloneFromProps->enabled;
       placeholder = cloneFromProps->placeholder;
       editable = cloneFromProps->editable;
       text = cloneFromProps->text;
       testID = cloneFromProps->testID;
       accessibilityLabel = cloneFromProps->accessibilityLabel;  
     }
  }

  void SetProp(uint32_t hash, winrt::hstring propName, winrt::Microsoft::ReactNative::IJSValueReader value) noexcept {
    winrt::Microsoft::ReactNative::ReadProp(hash, propName, value, *this);
  }

  REACT_FIELD(items)
  std::vector<RNCPickerSpec_RNCPickerProps_items> items;

  REACT_FIELD(selectedIndex)
  int32_t selectedIndex{-1};

  REACT_FIELD(enabled)
  bool enabled{true};

  REACT_FIELD(placeholder)
  std::optional<std::string> placeholder;

  REACT_FIELD(editable)
  bool editable{false};

  REACT_FIELD(text)
  std::optional<std::string> text;

  REACT_FIELD(testID)
  std::optional<std::string> testID;

  REACT_FIELD(accessibilityLabel)
  std::optional<std::string> accessibilityLabel;

  const winrt::Microsoft::ReactNative::ViewProps ViewProps;
};

REACT_STRUCT(RNCPicker_OnPickerSelect)
struct RNCPicker_OnPickerSelect {
  REACT_FIELD(value)
  std::string value;

  REACT_FIELD(itemIndex)
  int32_t itemIndex{};

  REACT_FIELD(text)
  std::string text;
};

struct RNCPickerEventEmitter {
  RNCPickerEventEmitter(const winrt::Microsoft::ReactNative::EventEmitter &eventEmitter)
      : m_eventEmitter(eventEmitter) {}

  using OnPickerSelect = RNCPicker_OnPickerSelect;

  void onPickerSelect(OnPickerSelect &value) const {
    m_eventEmitter.DispatchEvent(L"pickerSelect", [value](const winrt::Microsoft::ReactNative::IJSValueWriter writer) {
      winrt::Microsoft::ReactNative::WriteValue(writer, value);
    });
  }

 private:
  winrt::Microsoft::ReactNative::EventEmitter m_eventEmitter{nullptr};
};

template<typename TUserData>
struct BaseRNCPicker {

  virtual void UpdateProps(
    const winrt::Microsoft::ReactNative::ComponentView &/*view*/,
    const winrt::com_ptr<RNCPickerProps> &newProps,
    const winrt::com_ptr<RNCPickerProps> &/*oldProps*/) noexcept {
    m_props = newProps;
  }

  // UpdateLayoutMetrics will only be called if this method is overridden
  virtual void UpdateLayoutMetrics(
    const winrt::Microsoft::ReactNative::ComponentView &/*view*/,
    const winrt::Microsoft::ReactNative::LayoutMetrics &/*newLayoutMetrics*/,
    const winrt::Microsoft::ReactNative::LayoutMetrics &/*oldLayoutMetrics*/) noexcept {
  }

  // UpdateState will only be called if this method is overridden
  virtual void UpdateState(
    const winrt::Microsoft::ReactNative::ComponentView &/*view*/,
    const winrt::Microsoft::ReactNative::IComponentState &/*newState*/) noexcept {
  }

  virtual void UpdateEventEmitter(const std::shared_ptr<RNCPickerEventEmitter> &eventEmitter) noexcept {
    m_eventEmitter = eventEmitter;
  }

  // MountChildComponentView will only be called if this method is overridden
  virtual void MountChildComponentView(const winrt::Microsoft::ReactNative::ComponentView &/*view*/,
           const winrt::Microsoft::ReactNative::MountChildComponentViewArgs &/*args*/) noexcept {
  }

  // UnmountChildComponentView will only be called if this method is overridden
  virtual void UnmountChildComponentView(const winrt::Microsoft::ReactNative::ComponentView &/*view*/,
           const winrt::Microsoft::ReactNative::UnmountChildComponentViewArgs &/*args*/) noexcept {
  }

  // Initialize will only be called if this method is overridden
  virtual void Initialize(const winrt::Microsoft::ReactNative::ComponentView &/*view*/) noexcept {
  }

  // CreateVisual will only be called if this method is overridden
  virtual winrt::Microsoft::UI::Composition::Visual CreateVisual(const winrt::Microsoft::ReactNative::ComponentView &view) noexcept {
    return view.as<winrt::Microsoft::ReactNative::Composition::ComponentView>().Compositor().CreateSpriteVisual();
  }

  // FinalizeUpdate will only be called if this method is overridden
  virtual void FinalizeUpdate(const winrt::Microsoft::ReactNative::ComponentView &/*view*/,
                                        winrt::Microsoft::ReactNative::ComponentViewUpdateMask /*mask*/) noexcept {
  }

  

  const std::shared_ptr<RNCPickerEventEmitter>& EventEmitter() const { return m_eventEmitter; }
  const winrt::com_ptr<RNCPickerProps>& Props() const { return m_props; }

private:
  winrt::com_ptr<RNCPickerProps> m_props;
  std::shared_ptr<RNCPickerEventEmitter> m_eventEmitter;
};

template <typename TUserData>
void RegisterRNCPickerNativeComponent(
    winrt::Microsoft::ReactNative::IReactPackageBuilder const &packageBuilder,
    std::function<void(const winrt::Microsoft::ReactNative::Composition::IReactCompositionViewComponentBuilder&)> builderCallback) noexcept {
  packageBuilder.as<winrt::Microsoft::ReactNative::IReactPackageBuilderFabric>().AddViewComponent(
      L"RNCPicker", [builderCallback](winrt::Microsoft::ReactNative::IReactViewComponentBuilder const &builder) noexcept {
        auto compBuilder = builder.as<winrt::Microsoft::ReactNative::Composition::IReactCompositionViewComponentBuilder>();

        builder.SetCreateProps([](winrt::Microsoft::ReactNative::ViewProps props,
                              const winrt::Microsoft::ReactNative::IComponentProps& cloneFrom) noexcept {
            return winrt::make<RNCPickerProps>(props, cloneFrom); 
        });

        builder.SetUpdatePropsHandler([](const winrt::Microsoft::ReactNative::ComponentView &view,
                                     const winrt::Microsoft::ReactNative::IComponentProps &newProps,
                                     const winrt::Microsoft::ReactNative::IComponentProps &oldProps) noexcept {
            auto userData = view.UserData().as<TUserData>();
            userData->UpdateProps(view, newProps ? newProps.as<RNCPickerProps>() : nullptr, oldProps ? oldProps.as<RNCPickerProps>() : nullptr);
        });

        compBuilder.SetUpdateLayoutMetricsHandler([](const winrt::Microsoft::ReactNative::ComponentView &view,
                                      const winrt::Microsoft::ReactNative::LayoutMetrics &newLayoutMetrics,
                                      const winrt::Microsoft::ReactNative::LayoutMetrics &oldLayoutMetrics) noexcept {
            auto userData = view.UserData().as<TUserData>();
            userData->UpdateLayoutMetrics(view, newLayoutMetrics, oldLayoutMetrics);
        });

        builder.SetUpdateEventEmitterHandler([](const winrt::Microsoft::ReactNative::ComponentView &view,
                                     const winrt::Microsoft::ReactNative::EventEmitter &eventEmitter) noexcept {
          auto userData = view.UserData().as<TUserData>();
          userData->UpdateEventEmitter(std::make_shared<RNCPickerEventEmitter>(eventEmitter));
        });

        if CONSTEXPR_SUPPORTED_ON_VIRTUAL_FN_ADDRESS (&TUserData::FinalizeUpdate != &BaseRNCPicker<TUserData>::FinalizeUpdate) {
            builder.SetFinalizeUpdateHandler([](const winrt::Microsoft::ReactNative::ComponentView &view,
                                     winrt::Microsoft::ReactNative::ComponentViewUpdateMask mask) noexcept {
            auto userData = view.UserData().as<TUserData>();
            userData->FinalizeUpdate(view, mask);
          });
        } 

        if CONSTEXPR_SUPPORTED_ON_VIRTUAL_FN_ADDRESS (&TUserData::UpdateState != &BaseRNCPicker<TUserData>::UpdateState) {
          builder.SetUpdateStateHandler([](const winrt::Microsoft::ReactNative::ComponentView &view,
                                     const winrt::Microsoft::ReactNative::IComponentState &newState) noexcept {
            auto userData = view.UserData().as<TUserData>();
            userData->UpdateState(view, newState);
          });
        }

        if CONSTEXPR_SUPPORTED_ON_VIRTUAL_FN_ADDRESS (&TUserData::MountChildComponentView != &BaseRNCPicker<TUserData>::MountChildComponentView) {
          builder.SetMountChildComponentViewHandler([](const winrt::Microsoft::ReactNative::ComponentView &view,
                                      const winrt::Microsoft::ReactNative::MountChildComponentViewArgs &args) noexcept {
            auto userData = view.UserData().as<TUserData>();
            return userData->MountChildComponentView(view, args);
          });
        }

        if CONSTEXPR_SUPPORTED_ON_VIRTUAL_FN_ADDRESS (&TUserData::UnmountChildComponentView != &BaseRNCPicker<TUserData>::UnmountChildComponentView) {
          builder.SetUnmountChildComponentViewHandler([](const winrt::Microsoft::ReactNative::ComponentView &view,
                                      const winrt::Microsoft::ReactNative::UnmountChildComponentViewArgs &args) noexcept {
            auto userData = view.UserData().as<TUserData>();
            return userData->UnmountChildComponentView(view, args);
          });
        }

        compBuilder.SetViewComponentViewInitializer([](const winrt::Microsoft::ReactNative::ComponentView &view) noexcept {
          auto userData = winrt::make_self<TUserData>();
          if CONSTEXPR_SUPPORTED_ON_VIRTUAL_FN_ADDRESS (&TUserData::Initialize != &BaseRNCPicker<TUserData>::Initialize) {
            userData->Initialize(view);
          }
          view.UserData(*userData);
        });

        if CONSTEXPR_SUPPORTED_ON_VIRTUAL_FN_ADDRESS (&TUserData::CreateVisual != &BaseRNCPicker<TUserData>::CreateVisual) {
          compBuilder.SetCreateVisualHandler([](const winrt::Microsoft::ReactNative::ComponentView &view) noexcept {
            auto userData = view.UserData().as<TUserData>();
            return userData->CreateVisual(view);
          });
        }

        // Allow app to further customize the builder
        if (builderCallback) {
          builderCallback(compBuilder);
        }
      });
}

} // namespace PickerCodegen

