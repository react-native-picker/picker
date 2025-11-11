
/*
 * This file is auto-generated from RNCPickerNativeComponent spec file in flow / TypeScript.
 */
// clang-format off
#pragma once

#include <NativeModules.h>

#ifdef RNW_NEW_ARCH
#include <JSValueComposition.h>

#include <winrt/Microsoft.ReactNative.Composition.h>
#include <winrt/Microsoft.UI.Composition.h>
#endif // #ifdef RNW_NEW_ARCH

#ifdef RNW_NEW_ARCH

namespace Picker {

REACT_STRUCT(RNCPickerSpec_RNCPickerProps_items)
struct RNCPickerSpec_RNCPickerProps_items {
  REACT_FIELD(label)
  winrt::Microsoft::ReactNative::JSValue label{nullptr};

  REACT_FIELD(value)
  winrt::Microsoft::ReactNative::JSValue value{nullptr};

  REACT_FIELD(textColor)
  winrt::Microsoft::ReactNative::Color textColor{nullptr};

  REACT_FIELD(testID)
  std::optional<std::string> testID;
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
       selectionColor = cloneFromProps->selectionColor;
       color = cloneFromProps->color;
       textAlign = cloneFromProps->textAlign;
       numberOfLines = cloneFromProps->numberOfLines;
       fontSize = cloneFromProps->fontSize;
       fontWeight = cloneFromProps->fontWeight;
       fontStyle = cloneFromProps->fontStyle;
       fontFamily = cloneFromProps->fontFamily;
       testID = cloneFromProps->testID;
       themeVariant = cloneFromProps->themeVariant;  
     }
  }

  void SetProp(uint32_t hash, winrt::hstring propName, winrt::Microsoft::ReactNative::IJSValueReader value) noexcept {
    winrt::Microsoft::ReactNative::ReadProp(hash, propName, value, *this);
  }

  REACT_FIELD(items)
  std::vector<RNCPickerSpec_RNCPickerProps_items> items;

  REACT_FIELD(selectedIndex)
  int32_t selectedIndex{};

  REACT_FIELD(selectionColor)
  winrt::Microsoft::ReactNative::Color selectionColor{nullptr};

  REACT_FIELD(color)
  winrt::Microsoft::ReactNative::Color color{nullptr};

  REACT_FIELD(textAlign)
  std::optional<std::string> textAlign;

  REACT_FIELD(numberOfLines)
  std::optional<int32_t> numberOfLines{};

  REACT_FIELD(fontSize)
  std::optional<int32_t> fontSize{};

  REACT_FIELD(fontWeight)
  std::optional<std::string> fontWeight;

  REACT_FIELD(fontStyle)
  std::optional<std::string> fontStyle;

  REACT_FIELD(fontFamily)
  std::optional<std::string> fontFamily;

  REACT_FIELD(testID)
  std::optional<std::string> testID;

  REACT_FIELD(themeVariant)
  std::optional<std::string> themeVariant;

  const winrt::Microsoft::ReactNative::ViewProps ViewProps;
};

REACT_STRUCT(RNCPicker_OnChange)
struct RNCPicker_OnChange {
  REACT_FIELD(newValue)
  winrt::Microsoft::ReactNative::JSValue newValue{nullptr};

  REACT_FIELD(newIndex)
  int32_t newIndex{};
};

struct RNCPickerEventEmitter {
  RNCPickerEventEmitter(const winrt::Microsoft::ReactNative::EventEmitter &eventEmitter)
      : m_eventEmitter(eventEmitter) {}

  using OnChange = RNCPicker_OnChange;

  void onChange(OnChange &value) const {
    m_eventEmitter.DispatchEvent(L"change", [value](const winrt::Microsoft::ReactNative::IJSValueWriter writer) {
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

  // You must provide an implementation of this method to handle the "setNativeSelectedIndex" command
  virtual void HandleSetNativeSelectedIndexCommand(int32_t selectedIndex) noexcept = 0;

  void HandleCommand(const winrt::Microsoft::ReactNative::ComponentView &view, const winrt::Microsoft::ReactNative::HandleCommandArgs& args) noexcept {
    auto userData = view.UserData().as<TUserData>();
    auto commandName = args.CommandName();
    if (commandName == L"setNativeSelectedIndex") {
      int32_t selectedIndex;
      winrt::Microsoft::ReactNative::ReadArgs(args.CommandArgs(), selectedIndex);
      userData->HandleSetNativeSelectedIndexCommand(selectedIndex);
      return;
    }
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

        builder.SetCustomCommandHandler([](const winrt::Microsoft::ReactNative::ComponentView &view,
                                          const winrt::Microsoft::ReactNative::HandleCommandArgs& args) noexcept {
          auto userData = view.UserData().as<TUserData>();
          userData->HandleCommand(view, args);
        });

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

} // namespace Picker

#endif // #ifdef RNW_NEW_ARCH
