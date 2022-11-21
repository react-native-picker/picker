/**
* This code was generated by [react-native-codegen](https://www.npmjs.com/package/react-native-codegen).
*
* Do not edit this file as changes may cause incorrect behavior and will be lost
* once the code is regenerated.
*
* @generated by codegen project: GeneratePropsJavaInterface.js
*/

package com.facebook.react.viewmanagers;

import android.view.View;
import androidx.annotation.Nullable;
import com.facebook.react.bridge.ReadableArray;

public interface RNCAndroidDialogPickerManagerInterface<T extends View> {
  void setItems(T view, @Nullable ReadableArray value);
  void setColor(T view, @Nullable Integer value);
  void setPrompt(T view, @Nullable String value);
  void setEnabled(T view, boolean value);
  void setSelected(T view, int value);
  void setBackgroundColor(T view, int value);
  void setDropdownIconColor(T view, int value);
  void setDropdownIconRippleColor(T view, int value);
  void setNumberOfLines(T view, int value);
  void focus(T view);
  void blur(T view);
}
