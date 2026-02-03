# Quick Start Guide - SANAD App

## 🚀 Run the App in Simulator

### Step 1: Install Dependencies (if not installed)

```bash
cd /Users/ajayeb/Desktop/Sanad-Capstone-Fronend
npm install
```

### Step 2: Fix Expo Dependencies

```bash
npx expo install --fix
```

### Step 3: Start the App

**For iOS Simulator:**

```bash
npm run ios
```

**For Android Emulator:**

```bash
npm run android
```

**Or start Expo server manually:**

```bash
npm start
# Then press 'i' for iOS or 'a' for Android
```

## 🔧 Troubleshooting

### If simulator doesn't open:

1. **Clear cache and restart:**

```bash
rm -rf node_modules .expo
npm install
npx expo start --clear
```

2. **Check if simulator is installed:**

- iOS: Open Xcode → Preferences → Components → Download iOS Simulator
- Android: Open Android Studio → AVD Manager → Create/Start emulator

3. **Verify Expo CLI:**

```bash
npx expo --version
```

## 📱 Expected Behavior

After running `npm run ios` or `npm run android`:

1. Expo development server starts
2. Metro bundler compiles the app
3. Simulator/Emulator opens automatically
4. App loads in the simulator

## ⚠️ Common Issues

### Issue: "Cannot determine Expo SDK version"

**Solution:**

```bash
npm install expo@~54.0.33
npx expo install --fix
```

### Issue: Simulator doesn't update

**Solution:**

```bash
npm start -- --clear
# Then reload in simulator (Cmd+R on iOS, R+R on Android)
```

### Issue: "Module not found"

**Solution:**

```bash
rm -rf node_modules package-lock.json
npm install
```

## ✅ Verification

After starting, you should see:

- ✅ Expo development server running
- ✅ QR code in terminal
- ✅ Simulator/Emulator open
- ✅ App loading screen
- ✅ Login screen (if not logged in) or Home screen (if logged in)
