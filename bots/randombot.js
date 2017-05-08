var RandomBot = {
        newGame: function(playerNumber) {
        
        if (playerNumber === undefined) {
            RandomBot.playerNumber = 1
        } else {
            RandomBot.playerNumber = playerNumber
        }
        
    },
    makeMove: function() {
       // to disable to opponent, uncomment the next line
       // return PASS;

       RandomBot.board = get_board();
       
       if (RandomBot.playerNumber == 1) {
           RandomBot.x = get_my_x();
           RandomBot.y = get_my_y();
           RandomBot.ox = get_opponent_x();
           RandomBot.oy = get_opponent_y();
       } else {
           RandomBot.ox = get_my_x();
           RandomBot.oy = get_my_y();
           RandomBot.x = get_opponent_x();
           RandomBot.y = get_opponent_y();
       }

       // we found an item! take it!
       if (has_item(RandomBot.board[RandomBot.x][RandomBot.y])) {
           return TAKE;
       }
       
       
       var rand = Math.random() * 4;

       if (rand < 1) return NORTH;
       if (rand < 2) return SOUTH;
       if (rand < 3) return EAST;
       if (rand < 4) return WEST;

       return PASS;
    }
}



