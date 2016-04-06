function new_game() {
}

function make_move() {
  var board = get_board();
  var my_x = get_my_x();
  var my_y = get_my_y();
  trace("player2 at my (x,y) is: (" + my_x + ", " + my_y + ")")
  // we found an item! take it!
  if (has_item(board[my_x][my_y])) {
    trace("SHOULD TAKE");
    return TAKE;
  }

   var destination = find_nearest_fruit(my_x, my_y);
   trace("destination is " + destination[0] + ", " + destination[1]);

   var move = move_to_point(destination[0], destination[1]);
   trace("Move towards " + move);
   return move;
}
function find_nearest_fruit(x, y) {
  trace("find fruit nearest to (" + x + ", " + y + ")");
  var board = get_board();
  var foundFruit = false;
  var steps_away = 0;
  while (!foundFruit) {
    steps_away++;
    for (var test_x = Math.max(x - steps_away, 0); test_x <= Math.min(x + steps_away, board.length - 1); test_x++) {
      trace("test_x is " + test_x);
      var remaining_steps = Math.abs((x - test_x) - steps_away);
      trace("remaining steps is " + remaining_steps);
      for (var test_y = Math.max(y - remaining_steps, 0); test_y <= Math.min(y + remaining_steps, board[x].length - 1); test_y++) {
        trace("test (" + test_x + ", " + test_y + ")");
        if (has_item(board[test_x][test_y])) {
          return [test_x, test_y];
        }
      }
    }
  }
}

function move_to_point(x, y) {
  var my_x = get_my_x();
  var my_y = get_my_y();
  if (my_x == x && my_y == y) {
    return TAKE;
  }
  trace("move from (" + my_x + ", " + my_y + ") to (" + x + ", " + y + ")");
  if (my_x < x) {
    return EAST;
  }
  if (my_x > x) {
    return WEST;
  }
  if (my_y < y) {
    return SOUTH;
  }
  if (my_y > y) {
    return NORTH;
  }
  return PASS;
}

function find_largest_value_fruit(board) {
   // find largest value fruit available on board
   var number_of_item_types = get_number_of_item_types();
   // 5 becomes 1
   // 4 becomes 2
   // 3 becomes 3
   // 2 becomes 4
   // 1 becomes 5
   var max_item_type = null;
   if (number_of_item_types === 5) {
      max_item_type = 1;
   } else if (number_of_item_types === 4) {
      max_item_type = 2;
   } else if (number_of_item_types === 3) {
      max_item_type = 3;
   } else if (number_of_item_types === 2) {
      max_item_type = 4;
   } else if (number_of_item_types === 1) {
      max_item_type = 5;
   }
   // find its position on the board
   var y = null;
   var x = null;
   for (var i = 0; i < board.length; i++) {
      if (board[i].indexOf(max_item_type) > -1) {
         x = i;
         y = board[i].indexOf(max_item_type);
      }
   }
   console.log(board);
   console.log("find_largest_value_fruit" + x + " | "  + y);
   return [x, y];
}

// Optionally include this function if you'd like to always reset to a
// certain board number/layout. This is useful for repeatedly testing your
// bot(s) against known positions.
//
function default_board_number() {
  return 123;
}
