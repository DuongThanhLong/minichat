const Server = require("socket.io").Server;
const Socket = require("socket.io").Socket;
const Room = require('../models/Room');
const SHARE_SCREEN_STREAM = 0;
/**
 * 
 * @param {Server} io 
 * @param {Socket} socket 
 */
function handle(io, socket) {
  return async data => {
    socket.auth.user.streams[data.streamId] = {
      type: SHARE_SCREEN_STREAM,
      peerId: socket.id,
    };
    socket.broadcast.to(data.roomId).emit('room', {
      type: 'share_screen',
      data: {
        streamId: data.streamId,
        user: socket.auth.user
      }
    });
  }
}

module.exports = handle;