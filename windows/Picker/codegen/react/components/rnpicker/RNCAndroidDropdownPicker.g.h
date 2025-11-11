
/*
 * This file is auto-generated from RNCAndroidDropdownPickerNativeComponent spec file in flow / TypeScript.
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

REACT_STRUCT(RNCAndroidDropdownPickerSpec_RNCAndroidDropdownPickerProps_items)
struct RNCAndroidDropdownPickerSpec_RNCAndroidDropdownPickerProps_items {
  REACT_FIELD(label)
  std::string label;

  REACT_FIELD(value)
  std::optional<std::string> value;

  REACT_FIELD(color)
  winrt::Microsoft::ReactNative::Color color{nullptr};

  REACT_FIELD(fontFamily)
  std::optional<std::string> fontFamily;

  REACT_FIELD(enabled)
  std::optional<bool> enabled{};

  REACT_FIELD(style)
  std::optional<RNCAndroidDropdownPickerSpec_RNCAndroidDropdownPickerProps_style> style;
};

REACT_STRUCT(RNCAndroidDropdownPickerProps)
struct RNCAndroidDropdownPickerProps : winrt::implements<RNCAndroidDropdownPickerProps, winrt::Microsoft::ReactNative::IComponentProps> {
  RNCAndroidDropdownPickerProps(winrt::Microsoft::ReactNative::ViewProps props, const winrt::Microsoft::ReactNative::IComponentProps& cloneFrom)
    : ViewProps(props)
  {
     if (cloneFrom) {
       auto cloneFromProps = cloneFrom.as<RNCAndroidDropdownPickerProps>();
       items = cloneFromProps->items;
       color = cloneFromProps->color;
       prompt = cloneFromProps->prompt;
       enabled = cloneFromProps->enabled;
       selected = cloneFromProps->selected;
       backgroundColor = cloneFromProps->backgroundColor;
       dropdownIconColor = cloneFromProps->dropdownIconColor;
       dropdownIconRippleColor = cloneFromProps->dropdownIconRippleColor;
       numberOfLines = cloneFromProps->numberOfLines;  
     }
  }

  void SetProp(uint32_t hash, winrt::hstring propName, winrt::Microsoft::ReactNative::IJSValueReader value) noexcept {
    winrt::Microsoft::ReactNative::ReadProp(hash, propName, value, *this);
  }

  REACT_FIELD(items)
  std::vector<RNCAndroidDropdownPickerSpec_RNCAndroidDropdownPickerProps_items> items;

  REACT_FIELD(color)
  winrt::Microsoft::ReactNative::Color color{nullptr};

  REACT_FIELD(prompt)
  std::optional<std::string> prompt;

  REACT_FIELD(enabled)
  std::optional<bool> enabled{};

  REACT_FIELD(selected)
  int32_t selected{};

  REACT_FIELD(backgroundColor)
  std::optional<int32_t> backgroundColor{};

  REACT_FIELD(dropdownIconColor)
  std::optional<int32_t> dropdownIconColor{};

  REACT_FIELD(dropdownIconRippleColor)
  std::optional<int32_t> dropdownIconRippleColor{};

  REACT_FIELD(numberOfLines)
  std::optional<int32_t> numberOfLines{};

  const winrt::Microsoft::ReactNative::ViewProps ViewProps;
};

REACT_STRUCT(RNCAndroidDropdownPicker_OnSelect)
struct RNCAndroidDropdownPicker_OnSelect {
  REACT_FIELD(position)
  int32_t position{};
};

REACT_STRUCT(RNCAndroidDropdownPicker_OnFocus)
struct RNCAndroidDropdownPicker_OnFocus {
};

REACT_STRUCT(RNCAndroidDropdownPicker_OnBlur)
struct RNCAndroidDropdownPicker_OnBlur {
};

struct RNCAndroidDropdownPickerEventEmitter {
  RNCAndroidDropdownPickerEventEmitter(const winrt::Microsoft::ReactNative::EventEmitter &eventEmitter)
      : m_eventEmitter(eventEmitter) {}

  using OnSelect = RNCAndroidDropdownPicker_OnSelect;
  using OnFocus = RNCAndroidDropdownPicker_OnFocus;
  using OnBlur = RNCAndroidDropdownPicker_OnBlur;

  void onSelect(OnSelect &value) const {
    m_eventEmitter.DispatchEvent(L"select", [value](const winrt::Microsoft::ReactNative::IJSValueWriter writer) {
      winrt::Microsoft::ReactNative::WriteValue(writer, value);
    });
  }

  void onFocus(OnFocus &value) const {
    m_eventEmitter.DispatchEvent(L"focus", [value](const winrt::Microsoft::ReactNative::IJSValueWriter writer) {
      winrt::Microsoft::ReactNative::WriteValue(writer, value);
    });
  }

  void onBlur(OnBlur &value) const {
    m_eventEmitter.DispatchEvent(L"blur", [value](const winrt::Microsoft::ReactNative::IJSValueWriter writer) {
      winrt::Microsoft::ReactNative::WriteValue(writer, value);
    });
  }

 private:
  winrt::Microsoft::ReactNative::EventEmitter m_eventEmitter{nullptr};
};

template<typename TUserData>
struct BaseRNCAndroidDropdownPicker {

  virtual void UpdateProps(
    const winrt::Microsoft::ReactNative::ComponentView &/*view*/,
    const winrt::com_ptr<RNCAndroidDropdownPickerProps> &newProps,
    const winrt::com_ptr<RNCAndroidDropdownPickerProps> &/*oldProps*/) noexcept {
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

  virtual void UpdateEventEmitter(const std::shared_ptr<RNCAndroidDropdownPickerEventEmitter> &eventEmitter) noexcept {
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

  // You must provide an implementation of this method to handle the "focus" command
  virtual void HandleFocusCommand() noexcept = 0;

  // You must provide an implementation of this method to handle the "blur" command
  virtual void HandleBlurCommand() noexcept = 0;

  // You must provide an implementation of this method to handle the "setNativeSelected" command
  virtual void HandleSetNativeSelectedCommand(int32_t selected) noexcept = 0;

  void HandleCommand(const winrt::Microsoft::ReactNative::ComponentView &view, const winrt::Microsoft::ReactNative::HandleCommandArgs& args) noexcept {
    auto userData = view.UserData().as<TUserData>();
    auto commandName = args.CommandName();
    if (commandName == L"focus") {

      userData->HandleFocusCommand();
      return;
    }

    if (commandName == L"blur") {

      userData->HandleBlurCommand();
      return;
    }

    if (commandName == L"setNativeSelected") {
      int32_t selected;
      winrt::Microsoft::ReactNative::ReadArgs(args.CommandArgs(), selected);
      userData->HandleSetNativeSelectedCommand(selected);
      return;
    }
  }

  const std::shared_ptr<RNCAndroidDropdownPickerEventEmitter>& EventEmitter() const { return m_eventEmitter; }
  const winrt::com_ptr<RNCAndroidDropdownPickerProps>& Props() const { return m_props; }

private:
  winrt::com_ptr<RNCAndroidDropdownPickerProps> m_props;
  std::shared_ptr<RNCAndroidDropdownPickerEventEmitter> m_eventEmitter;
};

template <typename TUserData>
void RegisterRNCAndroidDropdownPickerNativeComponent(
    winrt::Microsoft::ReactNative::IReactPackageBuilder const &packageBuilder,
    std::function<void(const winrt::Microsoft::ReactNative::Composition::IReactCompositionViewComponentBuilder&)> builderCallback) noexcept {
  packageBuilder.as<winrt::Microsoft::ReactNative::IReactPackageBuilderFabric>().AddViewComponent(
      L"RNCAndroidDropdownPicker", [builderCallback](winrt::Microsoft::ReactNative::IReactViewComponentBuilder const &builder) noexcept {
        auto compBuilder = builder.as<winrt::Microsoft::ReactNative::Composition::IReactCompositionViewComponentBuilder>();

        builder.SetCreateProps([](winrt::Microsoft::ReactNative::ViewProps props,
                              const winrt::Microsoft::ReactNative::IComponentProps& cloneFrom) noexcept {
            return winrt::make<RNCAndroidDropdownPickerProps>(props, cloneFrom); 
        });

        builder.SetUpdatePropsHandler([](const winrt::Microsoft::ReactNative::ComponentView &view,
                                     const winrt::Microsoft::ReactNative::IComponentProps &newProps,
                                     const winrt::Microsoft::ReactNative::IComponentProps &oldProps) noexcept {
            auto userData = view.UserData().as<TUserData>();
            userData->UpdateProps(view, newProps ? newProps.as<RNCAndroidDropdownPickerProps>() : nullptr, oldProps ? oldProps.as<RNCAndroidDropdownPickerProps>() : nullptr);
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
          userData->UpdateEventEmitter(std::make_shared<RNCAndroidDropdownPickerEventEmitter>(eventEmitter));
        });

        if CONSTEXPR_SUPPORTED_ON_VIRTUAL_FN_ADDRESS (&TUserData::FinalizeUpdate != &BaseRNCAndroidDropdownPicker<TUserData>::FinalizeUpdate) {
            builder.SetFinalizeUpdateHandler([](const winrt::Microsoft::ReactNative::ComponentView &view,
                                     winrt::Microsoft::ReactNative::ComponentViewUpdateMask mask) noexcept {
            auto userData = view.UserData().as<TUserData>();
            userData->FinalizeUpdate(view, mask);
          });
        } 

        if CONSTEXPR_SUPPORTED_ON_VIRTUAL_FN_ADDRESS (&TUserData::UpdateState != &BaseRNCAndroidDropdownPicker<TUserData>::UpdateState) {
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

        if CONSTEXPR_SUPPORTED_ON_VIRTUAL_FN_ADDRESS (&TUserData::MountChildComponentView != &BaseRNCAndroidDropdownPicker<TUserData>::MountChildComponentView) {
          builder.SetMountChildComponentViewHandler([](const winrt::Microsoft::ReactNative::ComponentView &view,
                                      const winrt::Microsoft::ReactNative::MountChildComponentViewArgs &args) noexcept {
            auto userData = view.UserData().as<TUserData>();
            return userData->MountChildComponentView(view, args);
          });
        }

        if CONSTEXPR_SUPPORTED_ON_VIRTUAL_FN_ADDRESS (&TUserData::UnmountChildComponentView != &BaseRNCAndroidDropdownPicker<TUserData>::UnmountChildComponentView) {
          builder.SetUnmountChildComponentViewHandler([](const winrt::Microsoft::ReactNative::ComponentView &view,
                                      const winrt::Microsoft::ReactNative::UnmountChildComponentViewArgs &args) noexcept {
            auto userData = view.UserData().as<TUserData>();
            return userData->UnmountChildComponentView(view, args);
          });
        }

        compBuilder.SetViewComponentViewInitializer([](const winrt::Microsoft::ReactNative::ComponentView &view) noexcept {
          auto userData = winrt::make_self<TUserData>();
          if CONSTEXPR_SUPPORTED_ON_VIRTUAL_FN_ADDRESS (&TUserData::Initialize != &BaseRNCAndroidDropdownPicker<TUserData>::Initialize) {
            userData->Initialize(view);
          }
          view.UserData(*userData);
        });

        if CONSTEXPR_SUPPORTED_ON_VIRTUAL_FN_ADDRESS (&TUserData::CreateVisual != &BaseRNCAndroidDropdownPicker<TUserData>::CreateVisual) {
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
