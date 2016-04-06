function new_game() {
}

function make_move() {
   var board = get_board();
   var myX = get_my_x();
   var myY = get_my_y();

   // we found an item! take it!
   if (board[get_my_x()][get_my_y()] > 0) {
       return TAKE;
   }

   if(myX > 0 && has_item(board[myX-1][myY]) > 0){
      return WEST;
   }
   if(myX < WIDTH - 1 && has_item(board[myX+1][myY]) > 0){
      return EAST;
   }
   if(myY < HEIGHT - 1 && has_item(board[myX][myY+1]) > 0){
      return SOUTH;
   }
   if(myY > 0 && has_item(board[myX][myY-1]) > 0){
      return NORTH;
   }

   for(var i = -2; i <= 2; i++){
      for(var j = -2; j <= 2; j++){
         if(myX + i < WIDTH - 1 && myX + i > 0 && myY + j < HEIGHT && myY + j > 0){
            if(board[myX + i][myY + j] > 0){
               if(i > 0)
                  return EAST;
               if(i < 0)
                  return WEST;
               if(j > 0)
                  return SOUTH;
               else
                  return NORTH;
            }
         }
      }
   }


   for(var x = 0; x < WIDTH; x++){
      for (var y = 0; y < HEIGHT; y++){
         if (board[x][y] == 1)
         {
            var xDiff = myX - x;
            var yDiff = myY - y;
            if (Math.abs(xDiff) > Math.abs(yDiff)){
               if (xDiff > 0){
                  return WEST;
               } else {
                  return EAST;
               }
            } else {
               if (yDiff > 0){
                  return NORTH;
               }  else {
                  return SOUTH;
               }
            }
         }
      }
   }

   for(var i = -3; i <= 3; i++){
      for(var j = -3; j <= 3; j++){
         if(myX + i < WIDTH - 1 && myX + i > 0 && myY + j < HEIGHT && myY + j > 0){
            if(board[myX + i][myY + j] > 0){
               if(i > 0)
                  return EAST;
               if(i < 0)
                  return WEST;
               if(j > 0)
                  return SOUTH;
               else
                  return NORTH;
            }
         }
      }
   }

   for(var i = -4; i <= 4; i++){
      for(var j = -4; j <= 4; j++){
         if(myX + i < WIDTH - 1 && myX + i > 0 && myY + j < HEIGHT && myY + j > 0){
            if(board[myX + i][myY + j] > 0){
               if(i > 0)
                  return EAST;
               if(i < 0)
                  return WEST;
               if(j > 0)
                  return SOUTH;
               else
                  return NORTH;
            }
         }
      }
   }

   for(var i = -5; i <= 5; i++){
      for(var j = -5; j <= 5; j++){
         if(myX + i < WIDTH - 1 && myX + i > 0 && myY + j < HEIGHT && myY + j > 0){
            if(board[myX + i][myY + j] > 0){
               if(i > 0)
                  return EAST;
               if(i < 0)
                  return WEST;
               if(j > 0)
                  return SOUTH;
               else
                  return NORTH;
            }
         }
      }
   }

   for(var i = -6; i <= 6; i++){
      for(var j = -6; j <= 6; j++){
         if(myX + i < WIDTH - 1 && myX + i > 0 && myY + j < HEIGHT && myY + j > 0){
            if(board[myX + i][myY + j] > 0){
               if(i > 0)
                  return EAST;
               if(i < 0)
                  return WEST;
               if(j > 0)
                  return SOUTH;
               else
                  return NORTH;
            }
         }
      }
   }

   for(var i = -7; i <= 7; i++){
      for(var j = -7; j <= 7; j++){
         if(myX + i < WIDTH - 1 && myX + i > 0 && myY + j < HEIGHT && myY + j > 0){
            if(board[myX + i][myY + j] > 0){
               if(i > 0)
                  return EAST;
               if(i < 0)
                  return WEST;
               if(j > 0)
                  return SOUTH;
               else
                  return NORTH;
            }
         }
      }
   }

   for(var x = 0; x < WIDTH; x++){
      for (var y = 0; y < HEIGHT; y++){
         if (board[x][y] > 0)
         {
            var xDiff = myX - x;
            var yDiff = myY - y;
            if (Math.abs(xDiff) > Math.abs(yDiff)){
               if (xDiff > 0){
                  return WEST;
               } else {
                  return EAST;
               }
            } else {
               if (yDiff > 0){
                  return NORTH;
               }  else {
                  return SOUTH;
               }
            }
         }
      }
   }

   // for(var i = 2; i > 0; i--){
   //    if(myX > 0 && has_item(board[myX-i][myY]) > 0){
   //    return WEST;
   //    }
   //    if(myX < WIDTH - 1 && has_item(board[myX+i][myY]) > 0){
   //    return EAST;
   //    }
   //    if(myY < HEIGHT - 1 && has_item(board[myX][myY+i]) > 0){
   //    return SOUTH;
   //     }
   //    if(myY > 0 && has_item(board[myX][myY-i]) > 0){
   //    return NORTH;
   //    }
   // }

   

   var rand = Math.random() * 4;

   if (rand < 1) return NORTH;
   if (rand < 2) return SOUTH;
   if (rand < 3) return EAST;
   if (rand < 4) return WEST;

   return PASS;
}

// Optionally include this function if you'd like to always reset to a 
// certain board number/layout. This is useful for repeatedly testing your
// bot(s) against known positions.
//
//function default_board_number() {
//    return 123;
//}
