function new_game() {
}

function make_move() {
   var board = get_board();
   var Lim = 1;
   var Start = -1;
   
   for(var i=1; i<=get_number_of_item_types(); i++){
     if(get_opponent_item_count()>(get_total_item_count(i)/2)){
       for(var r=0; r<WIDTH; r++){
         for(var c=0; c<HEIGHT; c++){
            if(board[r][c]==i){
              board[r][c]=0;
            } 
         }
       } 
     }
   }
   
 if(board[get_my_x()][get_my_y()]>0) //found item
    return TAKE;
 
 //scan around you
   for(var r=Start; r<=Lim; r++){
      for(var c=Start; c<=Lim; c++){
          var x_check = r+get_my_x();
          var y_check = c+get_my_y();
          if(check(x_check, y_check) && board[x_check][y_check]>0){
              if(r<0)
                return WEST;
              else if(r>0)
                return EAST;
              else if(c<0)
                return NORTH;
              else if(c>0)
                return SOUTH; 
          }
            
      }
     if(r==Lim){
      Start--;
      r=Start;
      Lim++;
   }
   }
}

function check(x, y){
 if(x<0 || x>WIDTH-1){
  return false; 
 }
 if(y<0 || y>HEIGHT-1){
   return false;  
 }
 return true;
}
