{ pkgs, lib, config, inputs, ... }:

let
  homeDir = builtins.getEnv "HOME";
in
{
  # https://devenv.sh/basics/
  env = {
    ANDROID_AVD_HOME = "${homeDir}/.android/avd";
  };

  # https://devenv.sh/packages/
  # packages = [ pkgs.git ];

  # https://devenv.sh/languages/
  languages = {
    javascript.enable = true;
    javascript.npm.enable = true;
    typescript.enable = true;
  };

  android = {
    enable = true;
    platforms.version = ["35" "36"];
    buildTools.version = ["35.0.0" "36.0.0"];
    reactNative.enable = true;
    emulator.enable = true;
    cmdLineTools.version = "11.0";

    systemImages.enable = true;
    abis = [ "x86_64" ];
    systemImageTypes = [ "default" ];

    ndk.enable = true;
    ndk.version = ["27.1.12297006"];
    sources.enable = false;
    googleTVAddOns.enable = false;
    android-studio.enable = false;
  };

  packages = with pkgs; [
    watchman
    android-tools
  ];

  # packages = [
  #   (inputs.android-nixpkgs.sdk.${pkgs.system} (sdkPkgs: with sdkPkgs; [
  #     cmdline-tools-latest
  #     platform-tools
  #     emulator
  #     system-images-android-36-google-apis-playstore-x86-64
  #   ]))
  # ];
  # https://devenv.sh/processes/
  # processes.dev.exec = "${lib.getExe pkgs.watchexec} -n -- ls -la";

  # https://devenv.sh/services/
  # services.postgres.enable = true;

  # https://devenv.sh/scripts/
  scripts = {
    # Buat AVD
    create-avd.exec = ''
      echo "📱 Membuat AVD 'expo-phone'..."
      mkdir -p "$ANDROID_AVD_HOME"
      
      # Hapus AVD lama jika ada
      avdmanager delete avd --name expo-phone 2>/dev/null || true
      
      # Buat AVD (gunakan echo "no" untuk bypass pertanyaan custom hardware)
      # Catatan: device "pixel_7" mungkin tidak ada di profil bawaan, "pixel" lebih aman.
      echo "no" | avdmanager create avd \
        --force \
        --name expo-phone \
        --package "system-images;android-35;default;x86_64" \
        --device "pixel"
      
      if [ $? -eq 0 ]; then
        echo "✅ AVD 'expo-phone' berhasil dibuat!"
      else
        echo "❌ Gagal membuat AVD."
      fi
    '';

    # Jalankan emulator
    start-avd.exec = ''
      export QT_QPA_PLATFORM=xcb
      export LD_LIBRARY_PATH=""
      echo "🚀 Menjalankan emulator 'expo-phone'..."
      emulator -avd expo-phone -skin 1080x2400 -no-snapshot-save &
      echo "⏳ Tunggu emulator boot..."
      adb wait-for-device
      echo "✅ Emulator siap!"
    '';

    # Expo start
    expo-start.exec = ''
      echo "🌐 Menjalankan Expo development server..."
      npx expo start
    '';

    # Build APK release
    build-apk.exec = ''
      set -e
      echo "📦 Building Courtly Android APK release..."
      npx expo prebuild --platform android

      cd android 
      ./gradlew assembleRelease

      mkdir -p ../release
      cp app/build/outputs/apk/release/app-release.apk ../release/courtly-release.apk

      echo ""
      echo "✅ APK berhasil dibuild:"
      find . -name "*.apk" -path "*/release/*" | head -5
    '';
  };

  # https://devenv.sh/basics/
  enterShell = ''
    echo "🔍 Environment Android di Devenv:"
    echo "ANDROID_HOME: $ANDROID_HOME"
    echo "ANDROID_AVD_HOME: $ANDROID_AVD_HOME"

    echo ""
    echo "🚀 Perintah yang tersedia:"
    echo "   create-avd      → Buat Android Virtual Device (Hanya Sekali)"
    echo "   start-avd       → Jalankan emulator"
    echo "   expo-start      → Jalankan Expo development server"
    echo "   build-apk       → Build APK release"
    echo ""
  '';

  # https://devenv.sh/tasks/
  # tasks = {
  #   "myproj:setup".exec = "mytool build";
  #   "devenv:enterShell".after = [ "myproj:setup" ];
  # };

  # https://devenv.sh/tests/
  # enterTest = ''
  #   echo "Running tests"
  #   git --version | grep --color=auto "${pkgs.git.version}"
  # '';

  # https://devenv.sh/git-hooks/
  # git-hooks.hooks.shellcheck.enable = true;

  # See full reference at https://devenv.sh/reference/options/
}
