import Message from '../models/Message.js';

const socketHandler = (io) => {
  const onlineUsers = new Map(); // Store user online status

  io.on('connection', (socket) => {
    //console.log('New user connected');

    socket.on("joinProject", ({ userId, projectId, userName, userProfile }) => {
      socket.join(projectId);

      // Track online users with their details
      onlineUsers.set(userId, { socketId: socket.id, name: userName, profile: userProfile, projectId });

      // Emit updated online users to the project
      const projectUsers = Array.from(onlineUsers.values()).filter(user => user.projectId === projectId);
      io.to(projectId).emit("onlineUsers", projectUsers);
    });

    socket.on("sendMessage", async ({ projectId, senderId, senderName, senderProfile, message }) => {
      const newMessage = new Message({ projectId, senderId, senderName, senderProfile, message });
      await newMessage.save();

      io.to(projectId).emit("newMessage", {
        senderId,
        senderName,
        senderProfile,
        message,
        timestamp: new Date()
      });
    });

    socket.on('disconnect', () => {
      for (const [userId, userDetails] of onlineUsers.entries()) {
        if (userDetails.socketId === socket.id) {
          onlineUsers.delete(userId);
          const projectId = userDetails.projectId;
          const projectUsers = Array.from(onlineUsers.values()).filter(user => user.projectId === projectId);
          io.to(projectId).emit('onlineUsers', projectUsers);
        }
      }
      //console.log('User disconnected');
    });
  });
};

export default socketHandler;