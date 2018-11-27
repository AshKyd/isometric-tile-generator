rm -rf electron-dist
mkdir -p electron-dist/build/icons
parcel build --no-minify src/index.html -d electron-dist/ --public-url=.
cp package.json electron/electron-entry.js electron-dist/
icon=web/favicon.png
cp $icon electron-dist/build/icon.png
cp $icon electron-dist/build/icons/512x512.png
convert $icon  -bordercolor white -border 0 \
          \( -clone 0 -resize 16x16 \) \
          \( -clone 0 -resize 32x32 \) \
          \( -clone 0 -resize 48x48 \) \
          \( -clone 0 -resize 64x64 \) \
          \( -clone 0 -resize 512x512 \) \
          -delete 0 -alpha off -colors 256 electron-dist/build/icons/icon.ico
mv favicon.png icon.png
cd electron-dist
electron-builder -mlw

# Copy to binaries folder and make a JSON index
dir="../binaries/"
mkdir -p $dir
rm "$dir*"
cp dist/*.deb dist/*.AppImage dist/*.rpm dist/*.exe dist/*.dmg $dir
node ../electron/generate-version-info.js > $dir/index.json
