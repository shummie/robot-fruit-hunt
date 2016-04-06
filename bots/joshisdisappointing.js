function new_game() {
}

function make_move() {
   var board = get_board();

   // we found an item! take it!
   if (board[get_my_x()][get_my_y()] > 0) {
       return TAKE;
   }
   var rand = Math.random() * 4;
   /*for(var i =0; i<board[x].length; i++)
   {
      for(var n=0; n<board[y].length; n++)
         {*/
   if(has_item(board[get_my_x()][get_my_y()]))
      return TAKE;
   else if(has_item(board[get_my_x()+1][get_my_y()]))
      return EAST;
   else if(has_item(board[get_my_x()-1][get_my_y()]))
      return WEST;
   else if(has_item(board[get_my_x()][get_my_y()+1]))
      return SOUTH;
   else if(has_item(board[get_my_x()][get_my_y()-1]))
      return NORTH;
   else if(has_item(board[get_my_x()+1][get_my_y()+1]))
   {
      return EAST;
      return PASS;
      return SOUTH;
   }
   else if(has_item(board[get_my_x()+1][get_my_y()-1]))
   {
      return EAST;
      return PASS;
      return NORTH;
   }
   else if(has_item(board[get_my_x()-1][get_my_y()+1]))
   {
      return WEST;
      return PASS;
      return SOUTH;
   }
   else if(has_item(board[get_my_x()-1][get_my_y()-1]))
   {
      return WEST;
      return PASS;
      return NORTH;
   }
   else 
   {
       if (rand < 1) return NORTH;
       if (rand < 2) return SOUTH;
      if (rand < 3) return EAST;
      if (rand < 4) return WEST;
   }
  /*       }
   }*/
   
  
  /* if (rand < 1) return NORTH;
   if (rand < 2) return SOUTH;
   if (rand < 3) return EAST;
   if (rand < 4) return WEST;*/

   return PASS;
}

// Optionally include this function if you'd like to always reset to a 
// certain board number/layout. This is useful for repeatedly testing your
// bot(s) against known positions.
//
//function default_board_number() {
//    return 123;
//}
