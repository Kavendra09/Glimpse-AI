import ChatInput from "@/components/ChatInput";
import { useChatStore } from "@/store/chatStore";
import { router } from "expo-router";
import { Text, View } from "react-native";

export default function HomeScreen() {
  const createNewChat = useChatStore((state) => state.createNewChat);
  const addNewMessage = useChatStore((state) => state.addNewMessage);
  const setIsWaitingResponse = useChatStore(
    (state) => state.setIsWaitingForResponse
  );

  const handleSend = async (message: string, imageBase64: string | null) => {
    setIsWaitingResponse(true);
    const newChatId = createNewChat(message.slice(0, 50));
    addNewMessage(newChatId, {
      id: Date.now().toString(),
      role: "user",
      message,
      ...(imageBase64 && { image: imageBase64 }),
    });
    router.push(`/chat/${newChatId}`);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, imageBase64 }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      const aiResponseMessage = {
        id: Date.now().toString(),
        message: data.responseMessage,
        role: "assistant" as const,
      };

      addNewMessage(newChatId, aiResponseMessage);
    } catch (error) {
      console.error("Chat error: ", error);
    } finally {
      setIsWaitingResponse(false);
    }
  };

  return (
    <View className="flex-1 justify-center">
      <View className="flex-1">
        <Text className="text-3xl "> Hello</Text>
      </View>
      <ChatInput onSend={handleSend} />
    </View>
  );
}
