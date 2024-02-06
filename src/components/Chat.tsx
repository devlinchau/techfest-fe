import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Markdown from "markdown-to-jsx";
import Highlight from "react-highlight";
import { axiosInstance, nameAtom } from "@/lib/utils";
import { useAtomValue } from "jotai";
import { Textarea } from "./ui/textarea";

export default function Chat() {
  const name = useAtomValue(nameAtom);
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
        const response = await axiosInstance.post("/api/chatbot/", {
          message: messages[messages.length - 1],
        });
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

  return (
    <div className="flex flex-col h-screen w-full lg:w-2/3 mx-auto">
      <div className="flex-grow p-4 overflow-y-auto">
        <div className="mb-4 px-4 py-3 rounded-lg bg-slate-700">
          <span className="font-semibold text-gray-100">LoanTong</span>
          <br />
          <span className="text-gray-200">
            Hello {name}! Please input the following details to determine your loan eligibility:
              <ul className="list-disc ml-4 mt-2">
                <li><strong className="font-semibold">Loan Amount</strong>: </li>
                <li><strong className="font-semibold">Interest Rate</strong>: </li>
                <li><strong className="font-semibold">Annual Income</strong>:</li>
                <li><strong className="font-semibold">Term</strong> <span className="text-sm">(either 36 or 60 months)</span>: </li>
                <li><strong className="font-semibold">Grade</strong> <span className="text-sm">(ranging from A to F)</span>: </li>
                <li><strong className="font-semibold">Purpose of loan</strong> <span className="text-sm">(debt_consolidation, small_business, home_improvement, major_purchase, credit_card,
                   other, house, medical, car, vacation, moving, renewable_energy, wedding, educational)</span>: </li>
              </ul>
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
              className={`mb-4 px-4 py-3 rounded-lg ${
                item.isChatbot ? "bg-slate-700" : "bg-gray-200"
              } 
            ${!item.isChatbot ? "text-right" : ""}`}
            >
              <span
                className={`font-semibold ${
                  item.isChatbot ? "text-gray-100" : ""
                }`}
              >
                {item.isChatbot ? "LoanTong" : "User"}
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
        <Textarea
          placeholder="Type your message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
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
