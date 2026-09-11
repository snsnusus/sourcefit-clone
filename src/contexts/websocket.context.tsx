import { createContext, useContext, useEffect, useRef, useState } from 'react';

interface WebSocketContextType {
  sendMessage: (text: string, username: string, roomId?: string) => void;
  messages: ChatMessage[];
  isConnected: boolean;
}

interface ChatMessage {
  text: string;
  user: string;
  timestamp: string;
}

const WebSocketContext = createContext<WebSocketContextType | null>(null);

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    console.log('🔌 Attempting to connect to global WebSocket...');
    const socket = new WebSocket(`ws://${window.location.hostname}:4000/`);
    socketRef.current = socket;

    socket.onopen = () => {
      console.log('✅ SUCCESS: Global WebSocket connected!');
      setIsConnected(true);
    };

    socket.onclose = () => {
      console.log('❌ Global WebSocket disconnected.');
      setIsConnected(false);
    };

    socket.onmessage = (event) => {
      try {
        const parsedMessage: ChatMessage = JSON.parse(event.data);
        console.log('📩 Global message received:', parsedMessage);
        setMessages((prev) => [...prev, parsedMessage]);
      } catch (error) {
        console.error('❌ Encountered non-JSON message:', event.data);
      }
    };

    return () => {
      if (
        socket.readyState === WebSocket.OPEN ||
        socket.readyState === WebSocket.CONNECTING
      ) {
        console.log('🧹 Cleaning up: Closing WebSocket connection.');
        socket.close();
      }
    };
  }, []);

  const sendMessage = (text: string, username: string, roomId?: string) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      // Structure the message payload
      const messagePayload = {
        text: text,
        user: username,
        ...(roomId && { roomId }),
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };

      console.log('📤 Sending message via WebSocket:', messagePayload);

      // WebSockets only send text/binary, so we stringify our JSON object
      socketRef.current.send(JSON.stringify(messagePayload));
    } else {
      console.error('⚠️ Cannot send message: WebSocket is not connected.');
    }
  };

  return (
    <WebSocketContext.Provider value={{ sendMessage, messages, isConnected }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context)
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  return context;
};
