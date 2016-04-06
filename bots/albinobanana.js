function new_game() {
}

function make_move() {
   var board = get_board();

   // we found an item! take it!
   if (board[get_my_x()][get_my_y()] > 0) {
       return TAKE;
   }

   var rand = Math.random() * 4;// edit this
 
   for(var i=0;i<WIDTH;i++)
      {
         for(var n=0;n<HEIGHT;n++)
         {
            var currentFruit= board[i][n];
         if(get_total_item_count(currentFruit)==1)
         {
             goSomewhere(i,n);
         }
         else(get_total_item_count(currentFruit)==3)
         {
             goSomewhere(i,n);
         }

         }
      }   
   if (rand < 1) return NORTH;
   if (rand < 2) return SOUTH;
   if (rand < 3) return EAST;
   if (rand < 4) return WEST;

   return PASS;
    
}
function goSomewhere(get_target_x,get_target_y)
{
  if(Math.abs(get_target_x-get_my_x)>Math.abs(get_target_y-get_my_y))
  {
    if(get_target_x<get_my_x)
    {
       return WEST;
    }
    else
    {
       return EAST;
    }
  }
  else
  {
    if(get_target_y<get_my_y)
  {
    return NORTH;
  }
  else
  {
    return SOUTH;
  }
}
}

// Optionally include this function if you'd like to always reset to a 
// certain board number/layout. This is useful for repeatedly testing your
// bot(s) against known positions.
//
//function default_board_number() {
//    return 123;
//}
