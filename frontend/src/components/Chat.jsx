import { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import axios from "axios";
import { FaArrowDown } from "react-icons/fa";
import { format, isToday, isYesterday } from "date-fns";
import { useContext } from 'react';
import { StoreContext } from '../context/StoreContext.jsx';


const socket = io("http://localhost:5000"); // Update with actual backend URL

export default function Chat({ projectId, userId, userName, userProfile }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [showOnlineUsers, setShowOnlineUsers] = useState(false);
  const [showGoToNewest, setShowGoToNewest] = useState(false);
  const messagesContainerRef = useRef(null);
  const {url} = useContext(StoreContext);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`${url}/api/chat/${projectId}`);
        setMessages(response.data);
        scrollToBottom(); // Scroll to the bottom after fetching messages
      } catch (error) {
        console.error("Error fetching messages", error);
      }
    };

    fetchMessages();

    socket.emit("joinProject", { userId, projectId, userName, userProfile });

    socket.on("newMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
      scrollToBottom(); // Scroll to the bottom when a new message is received
    });

    socket.on("onlineUsers", (users) => {
      setOnlineUsers(users);
    });

    return () => {
      socket.disconnect();
    };
  }, [projectId, userId, userName, userProfile]);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("sendMessage", { projectId, senderId: userId, senderName: userName, senderProfile: userProfile, message });
      setMessage("");
      scrollToBottom(); // Scroll to the bottom after sending a message
    }
  };

  const scrollToBottom = () => {
    // Scroll only the chat container to the bottom
    messagesContainerRef.current?.scrollTo({
      top: messagesContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
    setShowGoToNewest(false);
  };

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollHeight - scrollTop === clientHeight) {
      setShowGoToNewest(false);
    } else {
      setShowGoToNewest(true);
    }
  };

  const formatDate = (date) => {
    const messageDate = new Date(date);
    if (isToday(messageDate)) {
      return "Today";
    } else if (isYesterday(messageDate)) {
      return "Yesterday";
    } else {
      return format(messageDate, "dd/MM/yyyy");
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-full w-full p-4 bg-gray-900 text-white rounded-2xl shadow-lg">
      {/* Discussion Board */}
      <div className="w-full md:w-3/4 flex flex-col relative">
        <button
          className="absolute top-4 left-4 bg-sky-500 text-white p-2 rounded-full shadow-lg md:hidden z-20"
          onClick={() => setShowOnlineUsers(!showOnlineUsers)}
        >
          <span className="bg-sky-500 rounded-full px-2 py-1 text-sm">{onlineUsers.length}</span>
        </button>
        <div
          className="h-[70vh] overflow-y-auto bg-gray-800 bg-opacity-50 rounded-lg p-4 backdrop-blur-md"
          onScroll={handleScroll}
          ref={messagesContainerRef} // Attach the ref to the chat container
        >
          {messages.map((msg, index) => (
            <div key={index}>
              {index === 0 || formatDate(messages[index - 1].timestamp) !== formatDate(msg.timestamp) ? (
                <div className="text-center text-gray-400 my-2">{formatDate(msg.timestamp)}</div>
              ) : null}
              <div
                className={`p-4 my-2 rounded-lg max-w-[80%] flex flex-col space-y-2 transition-transform transform ${
                  msg.senderId === userId ? "bg-gray-700 ml-auto" : "bg-gray-600"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <img src={msg.senderProfile || "https://via.placeholder.com/40"} alt="profile" className="w-8 h-8 rounded-full" />
                  <div className="ml-2">
                    <strong>{msg.senderId === userId ? "You" : msg.senderName}</strong>
                    <p className="text-sm text-gray-400">{format(new Date(msg.timestamp), "hh:mm a")}</p>
                  </div>
                </div>
                <div className="break-words">
                  <p>{msg.message}</p>
                </div>
              </div>
            </div>
          ))}
          {showGoToNewest && (
            <button
              className="sticky bottom-4 right-4 bg-black text-sky-500 p-2 rounded-full shadow-lg"
              onClick={scrollToBottom}
            >
              <FaArrowDown />
            </button>
          )}
        </div>
        {/* Message Input */}
        <div className="mt-2 flex gap-2">
          <textarea
            className="flex-grow bg-gray-700 text-white border-none p-2 rounded-lg resize-none"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            rows={1}
            onInput={(e) => {
              e.target.style.height = "auto";
              e.target.style.height = `${e.target.scrollHeight}px`;
            }}
          />
          <button className="bg-sky-500 text-white p-2 rounded-lg" onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
      {/* Online Users Panel */}
      <div className={`w-2/4 md:w-1/4 pl-4 mt-4 absolute md:relative md:mt-0 ${showOnlineUsers ? "block" : "hidden"} md:block`}>
        <div className="bg-gray-800 bg-opacity-50 min-h-[60vh] md:h-[74vh] p-4 rounded-lg backdrop-blur-md overflow-y-scroll no-scrollbar">
          <div className="flex items-center justify-between mb-4 cursor-pointer" onClick={() => setShowOnlineUsers(!showOnlineUsers)}>
            <h3 className="text-lg font-bold hidden md:block">Online Users</h3>
            <span className="bg-sky-500 rounded-full px-2 py-1 text-sm hidden md:block">{onlineUsers.length}</span>
          </div>
          <div className="overflow-y-auto max-h-[60vh]">
            {onlineUsers.map((user, index) => (
              <div key={index} className="p-2 bg-gray-700 rounded-lg my-1 flex items-center">
                <img src={user.profile || "https://via.placeholder.com/30"} alt="user" className="w-6 h-6 rounded-full mr-2" />
                {user.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}