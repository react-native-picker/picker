require 'json'

fabric_enabled = ENV['RCT_NEW_ARCH_ENABLED'] == '1'

package = JSON.parse(File.read(File.join(__dir__, 'package.json')))

Pod::Spec.new do |s|
  s.name         = "RNCPicker"
  s.version      = package['version']
  s.summary      = package['description']
  s.license      = package['license']

  s.authors      = package['author']
  s.homepage     = package['homepage']
  s.platforms    = { :ios => "9.0", :osx => "10.14" }

  s.source       = { :git => "https://github.com/react-native-picker/picker.git", :tag => "v#{s.version}" }

  if fabric_enabled
    s.platforms       = { ios: '11.0', tvos: '11.0' }
    s.source_files    = 'ios/**/*.{h,m,mm,cpp}'
    s.requires_arc    = true

    install_modules_dependencies(s)
  else 
    s.ios.source_files  = "ios/**/*.{h,m,mm}"
    s.osx.source_files  = "macos/**/*.{h,m,mm}"
  end
  
  s.dependency 'React-Core'
end
