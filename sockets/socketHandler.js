function initializeSocket(io) 
{
  // client connects to the server
  io.on('connection', (socket) => {
    console.log(`🔌 User connected: ${socket.id}`);

    // Listen for a client wanting to join a poll's room
    socket.on('join_poll_room', (pollId) => {
      // socket.join() subscribes the client to a specific room
      socket.join(pollId);
      console.log(`User ${socket.id} joined room for poll: ${pollId}`);
    });

    // Listen for a client leaving a poll's room
    socket.on('leave_poll_room', (pollId) => {
      socket.leave(pollId);
      console.log(`User ${socket.id} left room for poll: ${pollId}`);
    });

    socket.on('disconnect', () => {
      console.log(`🔌 User disconnected: ${socket.id}`);
    });
  });
}

export default initializeSocket;