var SimpleBot = {
    newGame: function(playerNumber) {

        if (playerNumber === undefined) {
            this.playerNumber = 1
        } else {
            this.playerNumber = playerNumber
        }

    },
    makeMove: function() {
       // to disable to opponent, uncomment the next line
       // return PASS;

       this.board = get_board();

       if (this.playerNumber == 1) {
           this.x = get_my_x();
           this.y = get_my_y();
           this.ox = get_opponent_x();
           this.oy = get_opponent_y();
       } else {
           this.ox = get_my_x();
           this.oy = get_my_y();
           this.x = get_opponent_x();
           this.y = get_opponent_y();
       }

       // we found an item! take it!
       if (has_item(this.board[this.x][this.y])) {
           return TAKE;
       }

       // looks like we'll have to keep track of what moves we've looked at
       this.toConsider = new Array();
       this.considered = new Array(HEIGHT);
       for (var i = 0; i < WIDTH; i++) {
           this.considered[i] = new Array(HEIGHT);
           for (var j = 0; j < HEIGHT; j++) {
               this.considered[i][j] = 0;
           }
       }

       // let's find the move that will start leading us to the closest item
       return this.findMove(new node(this.x, this.y, -1));
    },

    findMove: function(n) {
       // closest item! we will go to it
       if (has_item(this.board[n.x][n.y]))
           return n.move;

       var possibleMove = n.move;

       // NORTH
       if (this.considerMove(n.x, n.y-1)) {
           if (n.move == -1) {
               possibleMove = NORTH;
           }
           this.toConsider.push(new node(n.x, n.y-1, possibleMove));
       }

       // SOUTH
       if (this.considerMove(n.x, n.y+1)) {
           if (n.move == -1) {
               possibleMove = SOUTH;
           }
           this.toConsider.push(new node(n.x, n.y+1, possibleMove));
       }

       // WEST
       if (this.considerMove(n.x-1, n.y)) {
           if (n.move == -1) {
               possibleMove = WEST;
           }
           this.toConsider.push(new node(n.x-1, n.y, possibleMove));
       }

       // EAST
       if (this.considerMove(n.x+1, n.y)) {
           if (n.move == -1) {
               possibleMove = EAST;
           }
           this.toConsider.push(new node(n.x+1, n.y, possibleMove));
       }

       // take next node to bloom out from
       if (this.toConsider.length > 0) {
           var next = this.toConsider.shift();
           return this.findMove(next);
       }

       // no move found
       return -1;
    },

    considerMove: function(x, y) {
       if (!this.isValidMove(x, y)) return false;
       if (this.considered[x][y] > 0) return false;
       this.considered[x][y] = 1;
       return true;
    },

    isValidMove: function(x, y) {
        if (x < 0 || y < 0 || x >= WIDTH || y >= HEIGHT)
            return false;
        return true;
    }
}

function node(x, y, move) {
    this.x = x;
    this.y = y;
    this.move = move;
}


