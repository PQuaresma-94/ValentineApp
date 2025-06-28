# ValentineApp

A lightweight Valentine-themed trivia app built with **React Native** and **Expo**. Play, add, and edit quizzes that celebrate love!

> **Expo SDK 52**  |  React 18.3  |  React Native 0.76 ([raw.githubusercontent.com](https://raw.githubusercontent.com/PQuaresma-94/ValentineApp/main/package.json))

---

## 🎈 Quick Start

### 1  Clone & Install

```bash
# 1. grab the code
git clone https://github.com/PQuaresma-94/ValentineApp.git
cd ValentineApp

# 2. install JavaScript packages
npm install   # or yarn install
```

### 2  Run on Your **Phone** (Expo Go)

1. Install **Expo Go** from the *App Store* / *Google Play*.
2. Start the dev server:
   ```bash
   npm start         # opens the Expo Dev Tools in your browser
   ```
3. Make sure your phone and computer are on the **same Wi‑Fi network**.
4. Scan the QR code shown in the terminal/Dev Tools with Expo Go – the app will load on your device instantly.

### 3  Run on a **Simulator / Emulator**

> Expo takes care of building & installing the binary for you – no Xcode/Android Studio gymnastics.

| Platform    | Prerequisites                                                         | Command                                     |
| ----------- | --------------------------------------------------------------------- | ------------------------------------------- |
| **iOS**     | • Xcode (with Command‑Line Tools)• `xcrun simctl` works from Terminal | `npm run ios` or press `i` in Dev Tools     |
| **Android** | • Android Studio• At least one AVD started                            | `npm run android` or press `a` in Dev Tools |

These scripts are defined in **package.json**: `start`, `ios`, `android`, `web`. ([raw.githubusercontent.com](https://raw.githubusercontent.com/PQuaresma-94/ValentineApp/main/package.json))

### 4  Run in the **Browser**

```bash
npm run web
```

(Uses React Native Web so you can preview the UI quickly.)

---

## 📂 Project Structure

```
.
├── assets/              # icons, splash & adaptive icons
├── components/          # reusable UI pieces
├── modals/              # modal components
├── screen/              # feature screens (Home, Questions, etc.)
├── constants.js         # bundled quiz questions
├── App.js               # navigation container
└── app.json             # Expo / EAS config
```

## ✍️ Adding or Editing Questions

- Through the UI: **Home → Add Question** lets you create new quiz cards.
- Directly: update `constants.js` – each object contains `question`, `options`, and `correctAnswerIndex`. ([raw.githubusercontent.com](https://raw.githubusercontent.com/PQuaresma-94/ValentineApp/main/constants.js))

## 🛠️  Build & Distribute

For a production APK/IPA you can use **EAS Build**:

```bash
npm install -g eas-cli
# log in with your Expo account first

# build for Android
EAS_BUILD_NPM=1 eas build --platform android --profile production

# build for iOS (requires an Apple developer account)
EAS_BUILD_NPM=1 eas build --platform ios --profile production
```

See [EAS Build docs](https://docs.expo.dev/build/introduction/) for certificates, submission, and OTA updates.

---

## ⚙️  Troubleshooting

| Issue                                            | Fix                                                                                               |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------- |
| **Metro bundler can’t connect**                  | Ensure phone & PC are on the same network; try `tunnel` in Dev Tools if corporate VPN blocks LAN. |
| **App stuck on logo**                            | Clear Expo cache: `expo r -c` or delete `node_modules` and reinstall.                             |
| **Android build fails ("SDK 52 not installed")** | In Android Studio → *SDK Manager* install **Expo Go 52** system images.                           |

---

## 📝  License

This project is released under the terms of the **MIT License**.\
See the full text below (you can also copy it into a separate `LICENSE` file):

```txt
MIT License

Copyright (c) 2025 Pedro Quaresma

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the “Software”), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

