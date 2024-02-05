import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import Markdown from "markdown-to-jsx";
import Highlight from "react-highlight";

export default function Chat() {
  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<string[]>(
    JSON.parse(localStorage.getItem("chatMessages") || "[]"),
  );
  const [replies, setReplies] = useState<string[]>(
    JSON.parse(localStorage.getItem("chatReplies") || "[]"),
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
    localStorage.setItem("chatReplies", JSON.stringify(replies));
  }, [messages, replies]);

  useEffect(() => {
    const sendMessageToApi = async () => {
      try {
        setLoading(true);
        const response = await axios.post(
          "http://localhost:8000/api/chatbot/",
          { message: messages[messages.length - 1] },
        );
        setReplies([...replies, response.data.response]);
      } catch (error) {
        console.error("Error sending message to API:", error);
      } finally {
        setLoading(false);
      }
    };

    if (messages.length > replies.length) {
      sendMessageToApi();
    }
  }, [messages]);

  const handleSendMessage = () => {
    setMessages([...messages, input]);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    } else if (e.key === "Enter" && e.shiftKey) {
      setInput((prevInput) => prevInput + "\n");
    }
  };

  return (
    <div className="flex flex-col h-screen w-full lg:w-2/3 mx-auto">
      <div className="flex-grow p-4 overflow-y-auto">
        <div className="mb-4 px-4 py-3 rounded-lg bg-slate-700">
          <span className="font-semibold text-gray-100">Chatbot</span>
          <br />
          <span className="text-gray-200">
            Hello! How can I assist you today?
          </span>
        </div>
        {[
          ...messages.map((message, index) => ({
            content: message,
            index,
            isChatbot: false,
          })),
          ...replies.map((reply, index) => ({
            content: reply,
            index,
            isChatbot: true,
          })),
        ]
          .sort((a, b) => a.index - b.index)
          .map((item, index) => (
            <div
              key={index}
              className={`mb-4 px-4 py-3 rounded-lg ${item.isChatbot ? "bg-slate-700" : "bg-gray-200"
                } 
            ${!item.isChatbot ? "text-right" : ""}`}
            >
              <span
                className={`font-semibold ${item.isChatbot ? "text-gray-100" : ""
                  }`}
              >
                {item.isChatbot ? "Chatbot" : "User"}
              </span>
              <br />
              <span className={`${item.isChatbot ? "text-gray-200" : ""}`}>
                <Markdown
                  options={{
                    overrides: {
                      pre: Highlight,
                    },
                  }}
                >
                  {item.content}
                </Markdown>
              </span>
            </div>
          ))}
      </div>

      {loading && (
        <div className="flex justify-center items-center mb-5">
          <div
            className="animate-spin rounded-full border-t-4 border-blue-900 
            border-opacity-50 h-12 w-12"
          ></div>
        </div>
      )}

      <div className="flex w-full max-w-full items-center space-x-2 p-4">
        <Input
          className="flex-wrap"
          type="textarea"
          placeholder="Type your message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button type="submit" onClick={handleSendMessage}>
          Send
        </Button>
        <Button
          type="button"
          onClick={() => {
            localStorage.clear();
            setMessages([]);
            setReplies([]);
          }}
        >
          CLEAR
        </Button>
      </div>
    </div>
  );
}
