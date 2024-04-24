const Game = require('./kakegurui-memory-server')

var playerWaitingSocketId = null;
var playerRoom = {};
var roomsForGames = {};

module.exports.kakegurui = (server) => {
    return (socket) => {
        if (!playerWaitingSocketId) {
            socket.join(socket.id)
            playerWaitingSocketId = socket.id
        } else {
            socket.join(playerWaitingSocketId);
            roomsForGames[playerWaitingSocketId] = new Game(8, playerWaitingSocketId, socket.id);
            roomsForGames[playerWaitingSocketId].shuffleDeck();
            server.to(playerWaitingSocketId).emit("server:newGame", {
                socketIdStarts: (Math.random() * 10) < 5 ? playerWaitingSocketId : socket.id
            })
            playerRoom[playerWaitingSocketId] = playerWaitingSocketId;
            playerRoom[socket.id] = playerWaitingSocketId;
            playerWaitingSocketId = null;

        }

        socket.on("client:flipCard",({cardIndex})=>{
            const serverCardIndex = roomsForGames[playerRoom[socket.id].deck[cardIndex]];
            server.to(playerRoom[socket.id]).emit("server:flipCard", {cardIndex, serverCardIndex})
        })

        socket.on("client:checkMatch", ({card1, card2})=>{
            const currentGame = roomsForGames[playerRoom[socket.id]].checkForMatch(socket.id, card1, card2)
            server.to(playerRoom[socket.id]).emit("server:checkMatchServer", currentGame);
        })
    }
};