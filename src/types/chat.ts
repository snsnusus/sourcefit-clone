export interface Message {
  id: string;
  text: string;
  userId: string;
  senderName: string;
  recipientId: string;
  roomId: string;
  avatar?: string;
  timestamp: string;
}
