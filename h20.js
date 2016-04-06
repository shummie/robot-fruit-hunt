function new_game() {
}

function make_move() {
   var board = get_board();
   var r = get_my_x();
   var c = get_my_y();
   var type;
   // we found an item! take it!
   for(var numr=1; numr<WIDTH; numr++)
   {
      for(var numc=1; numc<HEIGHT; numc++)
      {
   if (board[r][c] > 0) {
       return TAKE;
   }
   if (isValid(r-numr, c) && board[r-numr][c] > 0) {
      type = board[r-numr][c]; 
      if(get_opponent_item_count(type) < get_total_item_count(type)/2 ){
       return WEST;   
      }
   }
   if (isValid(r+numr, c) && board[r+numr][c] > 0) {
      type = board[r+numr][c]; 
      if(get_opponent_item_count(type) < get_total_item_count(type)/2 ){
       return EAST;
      }
   }
   if (isValid(r, c-numc) && board[r][c-numc] > 0) {
      type = board[r][c-numc]; 
      if(get_opponent_item_count(type) < get_total_item_count(type)/2 ){
       return NORTH;
      }
   }
   if (isValid(r, c+numc) && board[r][c+numc] > 0) {
      type = board[r][c+numc]; 
      if(get_opponent_item_count(type) < get_total_item_count(type)/2 ){
       return SOUTH;
      }
   }
   if (isValid(r-numr, c-numc) && board[r-numr][c-numc] > 0) {
       type = board[r-numr][c-numc]; 
      if(get_opponent_item_count(type) < get_total_item_count(type)/2 ){
       return WEST;   
      }
   }
   if (isValid(r+numr, c-numc) && board[r+numr][c-numc] > 0) {
      type = board[r+numr][c-numc]; 
      if(get_opponent_item_count(type) < get_total_item_count(type)/2 ){
       return EAST;   
      }
   }
   if (isValid(r-numr, c+numc) && board[r-numr][c+numc] > 0) {
      type = board[r-numr][c+numc]; 
      if(get_opponent_item_count(type) < get_total_item_count(type)/2 ){
       return WEST;   
      }
   }
   if (isValid(r+numr, c+numc) && board[r+numr][c+numc] > 0) {
      type = board[r+numr][c+numc]; 
      if(get_opponent_item_count(type) < get_total_item_count(type)/2 ){
       return EAST;   
      }
   }
}
}


   // var rand = Math.random() * 4;

   // if (rand < 1) return NORTH;
   // if (rand < 2) return SOUTH;
   // if (rand < 3) return EAST;
   // if (rand < 4) return WEST;
   //return PASS;
}
 function isValid(r, c)
    {
        if (r >= 0 && r < WIDTH && c >= 0 && c < HEIGHT)
            return true;
        return false;
    }
// Optionally include this function if you'd like to always reset to a 
// certain board number/layout. This is useful for repeatedly testing your
// bot(s) against known positions.
//
//function default_board_number() {
//    return 123;
//}
