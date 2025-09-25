import { useLocalSearchParams } from "expo-router";
import { View, Text, FlatList } from "react-native";
import { useChatStore } from "@/store/chatStore";
import ChatInput from "@/components/ChatInput";
import MessageListItem from "@/components/MessageListItem";
import { useEffect, useRef } from "react";

export default function ChatScreen() {
  const { id } = useLocalSearchParams();

  const chat = useChatStore((state) =>
    state.chatHistory.find((chat) => chat.id === id)
  );

  const setIsWaitingForResponse = useChatStore(
    (state) => state.setIsWaitingForResponse
  );
  const isWaitingForRespone = useChatStore(
    (state) => state.isWaitingForResponse
  );

  useEffect(() => {
    const timeOut = setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
    return () => clearTimeout(timeOut);
  }, [chat?.message]);

  const addNewMessage = useChatStore((state) => state.addNewMessage);

  const flatListRef = useRef<FlatList | null>(null);

  const handleSend = async (message: string, imageBase64: string | null) => {
    if (!chat) return;
    setIsWaitingForResponse(true);

    // Add user message to store
    const userMessage = {
      id: Date.now().toString(),
      role: "user" as const,
      message,
      ...(imageBase64 && { image: imageBase64 }),
    };
    addNewMessage(chat.id, userMessage);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          imageBase64,
          chatHistory: chat.message,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error);
      }

      const aiResponseMessage = {
        id: Date.now().toString(),
        message: data.responseMessage,
        responseId: data.responseId,
        role: "assistant" as const,
      };
      addNewMessage(chat.id, aiResponseMessage);
    } catch (error) {
      console.error("chat error: ", error);
    } finally {
      setIsWaitingForResponse(false);
    }
  };

  if (!chat) {
    return (
      <View>
        <Text> chat {id} not found</Text>
      </View>
    );
  }

  return (
    <View className="flex-1">
      <FlatList
        ref={flatListRef}
        data={chat.message}
        renderItem={({ item }) => <MessageListItem messageItem={item} />}
        ListFooterComponent={() =>
          isWaitingForRespone && (
            <Text className="text-gray-400 px-6 mb-4 animate-pulse">
              Waiting for response ...
            </Text>
          )
        }
      />

      <ChatInput onSend={handleSend} isLoading={false} />
    </View>
  );
}
