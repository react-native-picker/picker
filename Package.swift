// swift-tools-version: 6.0
// Built through React Native's SwiftPM autolinker, which links this package at
// <app>/build/generated/autolinking/libs/RNCPicker. The relative package paths
// resolve from there to the app's React Native xcframeworks and codegen output.
// This file has no scaffolder marker, so `react-native spm scaffold` leaves it alone.

import PackageDescription

let package = Package(
    name: "RNCPicker",
    platforms: [.iOS("15.1")],
    products: [
        .library(name: "RNCPicker", targets: ["RNCPickerTarget"]),
    ],
    dependencies: [
        .package(name: "ReactNative", path: "../../../../xcframeworks"),
        .package(name: "React-GeneratedCode", path: "../../../ios"),
    ],
    targets: [
        // Not named RNCPicker: SwiftPM would take ios/RNCPicker.h as the umbrella
        // header and then reject the RNCPicker.xcodeproj folder next to it,
        // excluded or not. React Native links only the product, so the target
        // name is free.
        .target(
            name: "RNCPickerTarget",
            dependencies: [.product(name: "ReactHeaders", package: "ReactNative"), .product(name: "ReactNativeHeaders", package: "ReactNative"), .product(name: "ReactNativeDependenciesHeaders", package: "ReactNative"), .product(name: "ReactAppHeaders", package: "React-GeneratedCode")],
            path: "ios",
            exclude: ["RNCPicker.xcodeproj"],
            publicHeadersPath: ".",
            // CocoaPods gets RCT_NEW_ARCH_ENABLED from install_modules_dependencies;
            // without it every Fabric source compiles empty and the component is
            // never registered.
            cSettings: [.define("RCT_NEW_ARCH_ENABLED", to: "1"), .headerSearchPath(".")],
            cxxSettings: [.define("RCT_NEW_ARCH_ENABLED", to: "1"), .headerSearchPath("."), .define("DEBUG", .when(configuration: .debug)), .define("NDEBUG", .when(configuration: .release))],
            linkerSettings: [.linkedFramework("UIKit"), .linkedFramework("Foundation"), .linkedFramework("CoreGraphics")]
        ),
    ],
    cxxLanguageStandard: .cxx20
)
