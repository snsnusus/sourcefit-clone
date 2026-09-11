function initSocketServer(wss, redisClient) {
  function broadcastToAll(objData) {
    const outgoingMessage = JSON.stringify(objData);
    wss.clients.forEach((client) => {
      if (client.readyState === 1) client.send(outgoingMessage);
    });
  }

  wss.on('connection', (ws) => {
    console.log('🔌 A user connected');
    let assignedUserId = null;

    ws.on('message', async (data) => {
      try {
        const parsedData = JSON.parse(data.toString());

        if (parsedData.type === 'REGISTER_PRESENCE') {
          assignedUserId = parsedData.userId;
          await redisClient.sAdd('online_users', assignedUserId.toString());
          broadcastToAll({
            type: 'USER_STATUS_CHANGE',
            userId: assignedUserId,
            status: 'online',
          });
          return;
        }

        if (parsedData.type === 'GET_INITIAL_PRESENCE') {
          const onlineUserIds = await redisClient.sMembers('online_users');
          ws.send(
            JSON.stringify({
              type: 'INITIAL_PRESENCE_LIST',
              userIds: onlineUserIds,
            })
          );
          return;
        }

        broadcastToAll(parsedData);
      } catch (error) {
        console.error('❌ Socket Error:', error);
      }
    });

    ws.on('close', async () => {
      console.log('❌ A user disconnected');
      if (assignedUserId) {
        await redisClient.sRem('online_users', assignedUserId.toString());
        broadcastToAll({
          type: 'USER_STATUS_CHANGE',
          userId: assignedUserId,
          status: 'offline',
        });
      }
    });
  });
}

module.exports = { initSocketServer };
