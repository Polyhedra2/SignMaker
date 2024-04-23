echo "Building for: "
echo "Linux (arm64 and x86_64), Darwin/macOS (arm64 and x86_64) and Windows (arm64 and x86_64)"
npx @electron/packager . --platform=win32 --arch=arm64,x64 --icon=./icons/windows.ico --out=./out/1.0
echo "Windows Done"
npx @electron/packager . --platform=linux --arch=arm64,x64 --icon=./icons/linux.png --out=./out
echo "Linux Done (executable, not built to AppImage or DEB)"
npx @electron/packager . --platform=darwin --arch=arm64,x64 --icon=./icons/mac.icns --out=./out
echo "Darwin/macOS Done"
echo "Finished building packages!"