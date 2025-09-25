import { create } from "zustand";
import { Chat,Message } from "@/types/types";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ChatStore {
  chatHistory: Chat[];
  isWaitingForResponse: boolean,
  setIsWaitingForResponse: (isWaitingForResponse: boolean) => void;
  createNewChat: (title: string) => string;
  addNewMessage: (chatId: string, message: Message) => void;
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set) => ({
      chatHistory: [],
      isWaitingForResponse: false,
      setIsWaitingForResponse: (isWaitingForResponse: boolean) => {
        set({ isWaitingForResponse });
      },
      createNewChat: (title) => {
        const newChat: Chat = {
          id: Date.now().toString(),
          title,
          message: [],
        };

        set((state) => ({
          chatHistory: [newChat, ...state.chatHistory],
        }));
        return newChat.id;
      },
      addNewMessage: (chatId, message) => {
        set((state) => ({
          chatHistory: state.chatHistory.map((chat) =>
            chat.id === chatId
              ? { ...chat, message: [...chat.message, message] }
              : chat
          ),
        }));
      },
    }),
    {
      name: "chat-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
