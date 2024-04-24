const socket = io()

function ioGame(){
    this.startGame = function(callback){
        socket.on("server:newGame", data=>{
            data.myTurn = data.socketIdStarts == socket.id;
            callback(data);
        })
    }

    this.flipCard = function(cardIndex){
        socket.emit("client:flipCard",{cardIndex})
    }

    this.checkMatch = function({card1, card2}) {
        socket.emit("client:checkMatchServer",{card1, card2})
    }

    this.flipCardServer = function(callback){
        socket.on("server:flipCard", callback)
    }

    this.checkMatchServer = function(callback){
        socket.on("server:checkMatch", data=>{
            data.myTurn = data.player == socket.id ? data.isMatch : !data.isMatch;
            data.myStats = data.playerInfo[socket.id];

            if(data.gameOver){
                data.winner = data.myStats.matches.length > (data.totalMatches/2)
            }

            callback(data)
        })
    }

}

const socketGame = new ioGame();