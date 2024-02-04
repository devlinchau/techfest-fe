// src/components/Chat.tsx
import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"


export default function Chat() {
  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<string[]>([]);

  const handleSendMessage = () => {
    setMessages([...messages, input]);
    setInput("");
    // Implement logic to send message to the backend or OpenAI API
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevents the default behavior (e.g., submitting a form)
      handleSendMessage();
    } else if (e.key === 'Enter' && e.shiftKey) {
      setInput((prevInput) => prevInput + "\n");
    }
  };

  return (
    <div className="flex flex-col h-screen w-full lg:w-2/3 mx-auto">
      <div className="flex-grow p-4 overflow-y-auto">
        {messages.map((message, index) => (
          <div key={index} className="mb-2 p-2 rounded-lg bg-gray-200">
            <span className="font-semibold">User</span>
            <br />
            <span className="text-gray-800">{message}</span>
          </div>
        ))}
      </div>

      <div className="flex w-full max-w-full items-center space-x-2 p-4">
        <Input 
          className='flex-wrap'
          type="textarea" 
          placeholder="Type your message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button 
          type="submit" 
          onClick={handleSendMessage}
        >
          Send
        </Button>
      </div>

    </div>
  );
};

