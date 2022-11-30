#include <react/renderer/components/rnpicker/Props.h>
#include <react/renderer/core/conversions.h>
#include <react/renderer/components/view/conversions.h>
#include <react/jni/ReadableNativeMap.h>

namespace facebook
{
    namespace react
    {
        inline folly::dynamic styleToDynamic(const RNCAndroidDialogPickerItemsStyleStruct &style)
        {
            folly::dynamic values = folly::dynamic::object();

            values["color"] = *style.color;
            values["backgroundColor"] = *style.backgroundColor;
            values["fontFamily"] = style.fontFamily;
            values["fontSize"] = style.fontSize;

            return values;
        }

        inline folly::dynamic itemsToDynamic(const std::vector<RNCAndroidDialogPickerItemsStruct> &items)
        {
            folly::dynamic values = folly::dynamic::array();

            for (const auto &item : items)
            {
                folly::dynamic itemValues = folly::dynamic::object();
                itemValues["label"] = item.label;
                itemValues["value"] = item.value;
                itemValues["color"] = *item.color;
                itemValues["fontFamily"] = item.fontFamily;
                itemValues["enabled"] = item.enabled;
                itemValues["style"] = styleToDynamic(item.style);
                values.push_back(itemValues);
            }

            return values;
        }

        inline folly::dynamic toDynamic(const RNCAndroidDialogPickerProps &props, int selected)
        {
            folly::dynamic values = folly::dynamic::object();
            values["items"] = itemsToDynamic(props.items);
            values["color"] = *props.color; // TODO: seems not to be used anywhere
            values["prompt"] = props.prompt;
            values["selected"] = selected;
            values["backgroundColor"] = props.backgroundColor;
            values["dropdownIconColor"] = props.dropdownIconColor;
            values["dropdownIconRippleColor"] = props.dropdownIconRippleColor;
            values["numberOfLines"] = props.numberOfLines;

            return values;
        }
    } // namespace react
} // namespace facebook