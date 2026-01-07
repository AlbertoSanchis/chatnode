const WebSocket = require('ws');

const PORT = process.env.PORT || 8080;
const wss = new WebSocket.Server({ port: PORT });


console.log('Servidor WebSocket escuchando en puerto 8080');

wss.on('connection', ws => {
    console.log('Cliente conectado');

    ws.on('message', mensaje => {
        // Enviar el mensaje a todos los clientes
        wss.clients.forEach(cliente => {
            if (cliente.readyState === WebSocket.OPEN) {
                cliente.send(mensaje.toString());
            }
        });
    });

    ws.on('close', () => {
        console.log('Cliente desconectado');
    });
});
