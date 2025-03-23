import React, { useState } from "react";
import { messageData } from "./data";
import SVGIcon from "../../lib/utils/SVGIcon";
import { useTheme } from "../../lib/hoc/AppContext";

const Chat: React.FC = () => {
  const { theme } = useTheme();
  const [messages] = useState(messageData);
  const [newMessage, setNewMessage] = useState("");

  return (
    <div
      className={`w-full sm:w-1/3 border-r ${
        theme === "dark" ? "border-gray-700" : "border-gray-200"
      } flex flex-col ${
        theme === "dark" ? "bg-gray-700" : "bg-gray-200"
      } transition-colors duration-300`}
    >
      <div
        className={`p-4 border-b ${
          theme === "dark" ? "border-gray-800" : "border-gray-300"
        }`}
      >
        <h2
          className={`text-xl font-semibold ${
            theme === "dark" ? "text-gray-100" : "text-gray-800"
          }`}
        >
          Chat Assistant
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.isBot ? "justify-start" : "justify-end"
            }`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.isBot
                  ? theme === "dark"
                    ? "bg-gray-800 text-gray-200"
                    : "bg-gray-100 text-gray-800"
                  : "bg-fuchsia-700 text-white"
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>

      <div
        className={`p-4 border-t ${
          theme === "dark"
            ? "border-gray-700 bg-gray-800"
            : "border-gray-200 bg-fuchsia-100"
        } transition-colors duration-300`}
      >
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className={`flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
              theme === "dark"
                ? "bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400"
                : "bg-white border-gray-300 text-gray-700"
            }`}
          />
          <button className="p-2 text-white flex justify-center rounded-lg cursor-pointer">
            <div
              className={`svg-normal ${
                theme === "dark" ? "text-gray-300" : "text-gray-400"
              } h-5 w-5`}
            >
              <SVGIcon name="send_icon" size={20} />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
