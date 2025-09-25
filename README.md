# 🤖 Expo Chat App (Gemini API)

A simple **chat application** built with [Expo](https://expo.dev/), [React Native](https://reactnative.dev/), and the **Google Gemini API**.  
This app demonstrates how to build a chat interface and connect it to an LLM backend wrapper using the Gemini API.

---

## 🚀 Features
- Chat interface with user & assistant messages  
- Persistent conversation history (local state)  
- Backend API wrapper for Google Gemini  
- Works on **iOS, Android, and Web** with Expo  

---

## 📸 Screenshots

### Chat Screen Example
<img src="https://lh3.googleusercontent.com/d/1eRtGaR0cCce1Pju6mujx_AeTm1hjT5so" width="300" />
<img src="https://lh3.googleusercontent.com/d/1xPXLvUTPzqCznReKv0-MnSFNrG974Exj" width="300" />

---

## 📦 Tech Stack
- **Frontend**: React Native + Expo Router  
- **State Management**: Zustand (`useChatStore`)  
- **Styling**: NativeWind (Tailwind for RN)  
- **Backend API**: Next.js / Expo Route Handler + `@google/genai`  

---

## 🔧 Setup & Installation

### 1. Clone the repository
```bash
git clone https://github.com/Kavendra09/Glimpse-AI.git
cd Glimpse-AI
```

### 2. Install dependencies
```bash
npm install
# or
yarn install
```

### 3. Add your Gemini API Key
Create a **.env.local** file in the project root:

```env
GOOGLE_API_KEY=your_gemini_api_key_here
```

👉 Get your API key from [Google AI Studio](https://aistudio.google.com/app/apikey).

### 4. Run the app
```bash
npx expo start
```

- Press `i` to run on iOS Simulator  
- Press `a` to run on Android Emulator  
- Press `w` to run in Web Browser  

---

## 📂 Project Structure

```
src/
 ├── app/
 │   ├── index.tsx         # Home screen
 │   ├── chat/[id].tsx     # Chat screen (dynamic route)
 │   └── api/chat.ts       # API route (Gemini wrapper)
 │
 ├── components/
 │   ├── ChatInput.tsx     # Input box for sending messages
 │   └── MessageListItem.tsx # Renders each chat message
 │
 └── store/
     └── chatStore.ts      # Zustand store for managing chat state
```

---

## 📝 Usage
1. Open the app.  
2. Type a message in the chat box.  
3. The app will send your full conversation history to the Gemini API.  
4. Responses from Gemini appear in the chat thread.  

---

## 📌 Notes
- This project is for learning/demo purposes.  
- You can extend it with authentication, database (for persistent history), or other AI features.  

---

## 📜 License
MIT License © 2025 [Your Name]
