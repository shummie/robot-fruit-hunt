function new_game() {
}

var CLARENCES_MEMORY = [];
function make_move() {
	var board = get_board();
	console.log(board);
	// we found an item! take it!
	if (board[get_my_x()][get_my_y()] > 0) {
		 return TAKE;
	}
	var a = return_nearest_fruit(get_my_x(),get_my_y());
	if(CLARENCES_MEMORY[1] && a[1] == CLARENCES_MEMORY[1] && a[2] != CLARENCES_MEMORY[2])
	{
		return CLARENCES_MEMORY[2];
	}
	console.log(a);
	CLARENCES_MEMORY = a;
	return a[2];
}

// Optionally include this function if you'd like to always reset to a 
// certain board number/layout. This is useful for repeatedly testing your
// bot(s) against known positions.
//
//function default_board_number() {
//    return 123;
//}

function return_nearest_fruit (x, y) {
	var fruit_distances = [];
	var board = get_board();
	for(var i = 0; i < WIDTH; i++)
	{
		for(var j = 0; j < HEIGHT; j++)
		{
			if(board[i][j] > 0)
			{
				fruit_distances.push([board[i][j], Math.abs(i -x)+Math.abs(j -y), ubisoft_direction(i - x, j -y)]);
				console.log(i +", " + j);

			}
		}
	}
	console.log(fruit_distances);
	var ret = fruit_distances[0];
	for(var k = 0; k < fruit_distances.length; k++)
	{
		if(fruit_distances[k][1] < ret[1])
		{
			ret[0] = fruit_distances[k][0];
			ret[1] = fruit_distances[k][1];
			ret[2] = fruit_distances[k][2];
		}
	}
	return ret;
}

function ubisoft_direction (dx, dy) {
	if(dy > dx)
		if(dy > -dx)
			return SOUTH;
		else
			return WEST;
	else
		if(dy > -dx)
			return EAST;
		else
			return NORTH;
}
