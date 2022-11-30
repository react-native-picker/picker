package com.reactnativecommunity.picker;

import android.content.Context;
import android.content.res.Resources;
import android.util.AttributeSet;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.annotation.UiThread;
import androidx.appcompat.widget.AppCompatSpinner;

import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.uimanager.FabricViewStateManager;
import com.facebook.react.uimanager.StateWrapper;

public abstract class FabricEnabledPicker extends AppCompatSpinner implements FabricViewStateManager.HasFabricViewStateManager {
    private FabricViewStateManager mFabricViewStateManager = new FabricViewStateManager();

    @Override
    public FabricViewStateManager getFabricViewStateManager() {
        return mFabricViewStateManager;
    }

    public void setStateWrapper(StateWrapper stateWrapper) {
        mFabricViewStateManager.setStateWrapper(stateWrapper);
    }

    protected void setSelectedIndex(int index) {
        updateState(index);
    }

    @UiThread
    void updateState(int index) {
        // Check incoming state values. If they're already the correct value, return early to prevent
        // infinite UpdateState/SetState loop.
        ReadableMap currentState = mFabricViewStateManager.getStateData();
        if (currentState != null) {
            float stateIndex = currentState.hasKey("selectedIndex") ? currentState.getInt("selectedIndex") : 1;
            if (stateIndex == index) {
                return;
            }
        }
        mFabricViewStateManager.setState(new FabricViewStateManager.StateUpdateCallback() {
            @Override
            public WritableMap getStateUpdate() {
                WritableMap map = new WritableNativeMap();
                map.putInt("selectedIndex", index);
                return map;
            }
        });
    }

    public FabricEnabledPicker(@NonNull Context context) {
        super(context);
    }

    public FabricEnabledPicker(@NonNull Context context, int mode) {
        super(context, mode);
    }

    public FabricEnabledPicker(@NonNull Context context, @Nullable AttributeSet attrs) {
        super(context, attrs);
    }

    public FabricEnabledPicker(@NonNull Context context, @Nullable AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
    }

    public FabricEnabledPicker(@NonNull Context context, @Nullable AttributeSet attrs, int defStyleAttr, int mode) {
        super(context, attrs, defStyleAttr, mode);
    }

    public FabricEnabledPicker(@NonNull Context context, @Nullable AttributeSet attrs, int defStyleAttr, int mode, Resources.Theme popupTheme) {
        super(context, attrs, defStyleAttr, mode, popupTheme);
    }
}
