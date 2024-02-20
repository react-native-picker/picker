package com.reactnativecommunity.picker;

public record ReactPickerLocalData(int height) {

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ReactPickerLocalData that = (ReactPickerLocalData) o;
        return height == that.height;
    }

    @Override
    public String toString() {
        return "RectPickerLocalData{" +
                "height=" + height +
                '}';
    }
}
