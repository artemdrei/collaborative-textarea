import ReconnectingWebSocket from 'reconnecting-websocket';

/*eslint-disable */
const socketLogger = (socket: ReconnectingWebSocket): void => {
  socket.addEventListener('open', (data) => {
    console.log('WebSocket Open', data);
  });

  socket.addEventListener('close', (data) => {
    console.log('WebSocket Close ', data);
  });

  socket.addEventListener('error', (data) => {
    console.log('WebSocket Error ', data);
  });
};

export default socketLogger;
