/**
* This code was generated by [react-native-codegen](https://www.npmjs.com/package/react-native-codegen).
*
* Do not edit this file as changes may cause incorrect behavior and will be lost
* once the code is regenerated.
*
* @generated by codegen project: GeneratePropsJavaDelegate.js
*/

package com.facebook.react.viewmanagers;

import android.view.View;
import androidx.annotation.Nullable;
import com.facebook.react.bridge.ColorPropConverter;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.uimanager.BaseViewManagerDelegate;
import com.facebook.react.uimanager.BaseViewManagerInterface;

public class RNCAndroidDialogPickerManagerDelegate<T extends View, U extends BaseViewManagerInterface<T> & RNCAndroidDialogPickerManagerInterface<T>> extends BaseViewManagerDelegate<T, U> {
  public RNCAndroidDialogPickerManagerDelegate(U viewManager) {
    super(viewManager);
  }
  @Override
  public void setProperty(T view, String propName, @Nullable Object value) {
    switch (propName) {
      case "items":
        mViewManager.setItems(view, (ReadableArray) value);
        break;
      case "color":
        mViewManager.setColor(view, ColorPropConverter.getColor(value, view.getContext()));
        break;
      case "prompt":
        mViewManager.setPrompt(view, value == null ? null : (String) value);
        break;
      case "enabled":
        mViewManager.setEnabled(view, value == null ? false : (boolean) value);
        break;
      case "selected":
        mViewManager.setSelected(view, value == null ? 0 : ((Double) value).intValue());
        break;
      case "backgroundColor":
        mViewManager.setBackgroundColor(view, value == null ? 0 : ((Double) value).intValue());
        break;
      case "dropdownIconColor":
        mViewManager.setDropdownIconColor(view, value == null ? 0 : ((Double) value).intValue());
        break;
      case "dropdownIconRippleColor":
        mViewManager.setDropdownIconRippleColor(view, value == null ? 0 : ((Double) value).intValue());
        break;
      case "numberOfLines":
        mViewManager.setNumberOfLines(view, value == null ? 0 : ((Double) value).intValue());
        break;
      default:
        super.setProperty(view, propName, value);
    }
  }

  @Override
  public void receiveCommand(T view, String commandName, ReadableArray args) {
    switch (commandName) {
      case "focus":
        mViewManager.focus(view);
        break;
      case "blur":
        mViewManager.blur(view);
        break;
    }
  }
}
