"use client";
import * as React from "react";
import Box from "@mui/joy/Box";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import Typography from "@mui/joy/Typography";
import Card from "@mui/joy/Card";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function ChatBox() {
  const [messages, setMessages] = React.useState<{ text: string; sender: "user" | "bot" }[]>([]);
  const [input, setInput] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

  const formatMessage = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") 
      .replace(/\n/g, "<br />") 
      .replace(/🔹/g, "•"); 
  };

  const fetchGeminiResponse = async (userMessage: string) => {
    try {
      const genAI = new GoogleGenerativeAI(API_KEY as string);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const result = await model.generateContent(userMessage);
      const response = await result.response;
      const text = response.text();

      return formatMessage(text || "I'm here to support you. How do you feel?");
    } catch (error) {
      console.error("Error fetching Gemini response:", error);
      return "I'm sorry, I couldn't process your message. Please try again.";
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages([...messages, { text: userMessage, sender: "user" }]);
    setInput("");
    setLoading(true);

    const botResponse = await fetchGeminiResponse(userMessage);
    setMessages((prev) => [...prev, { text: botResponse, sender: "bot" }]);
    setLoading(false);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", flex: 1, p: 2 }}>
      {/* Messages Area */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          p: 2,
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        {messages.map((msg, index) => (
          <Card
            key={index}
            sx={{
              maxWidth: "75%",
              alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
              bgcolor: msg.sender === "user" ? "primary.softBg" : "neutral.softBg",
              p: 1.5,
            }}
          >
            <Typography>
              {msg.sender === "bot" ? (
                <span dangerouslySetInnerHTML={{ __html: msg.text }} />
              ) : (
                msg.text
              )}
            </Typography>
          </Card>
        ))}
        {loading && (
          <Typography sx={{ alignSelf: "flex-start", color: "gray" }}>Typing...</Typography>
        )}
      </Box>

      {/* Input Area */}
      <Box sx={{ display: "flex", gap: 1, p: 1, borderTop: "1px solid #ddd" }}>
        <Input
          fullWidth
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          disabled={loading}
        />
        <Button onClick={handleSendMessage} variant="solid" disabled={loading}>
          {loading ? "Sending..." : "Send"}
        </Button>
      </Box>
    </Box>
  );
}
