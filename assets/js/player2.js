var GamePlay = {
    init: function() {
        GamePlay.canvas = document.getElementById('game_view');
        $('.pause').bind('click', function() { GamePlay.mode = "pause";});
        $('.play').bind('click', function() { GamePlay.mode = "play"; GamePlay.nextMove();});
        $('.forward').bind('click', function() { GamePlay.nextMove();});
        $('.newgame').bind('click', function() { GamePlay.setupNewGame();});
        $('.reset').bind('click', function() { Board.reset();});
        $('#set_board').bind('click', function() { GamePlay.setBoardNumber();});
        $('#board_number').bind('keyup', function(e) { if(e.keyCode == 13) {GamePlay.setBoardNumber();}});
        $('#set_speed').bind('click', function() { GamePlay.setBoardSpeed();});
        $('#board_speed').bind('keyup', function(e) { if(e.keyCode == 13) {GamePlay.setBoardSpeed();}});

        $('#check_breadcrumbs').click(function(evt) {
          if (evt.srcElement.checked) {
            GamePlay.show_breadcrumbs = true;
          } else {
            GamePlay.show_breadcrumbs = false;
          }
        });

        $('#check_autoplay').click(function(evt) {
          if (evt.srcElement.checked) {
            GamePlay.autoplay = true;
            GamePlay.mode = "play";
            Board.processMove();
            GamePlay.draw();
          } else {
            GamePlay.autoplay = false;
          }
        });        
        
        GamePlay.worksafe = false;
        
        GamePlay.gameOver = false;
        GamePlay.autoplay = false;
        GamePlay.show_breadcrumbs = false;
        var itemImageUrls = ["assets/images/FruitApple.png", "assets/images/FruitBanana.png", "assets/images/FruitCherry.png", "assets/images/FruitMelon.png", "assets/images/FruitOrange.png"];
        GamePlay.itemImages = new Array();
        for (var i=0; i<itemImageUrls.length; i++) {
            var img = new Image();
            img.src = itemImageUrls[i];
            GamePlay.itemImages[i] = img;
        }
        GamePlay.boardSpeed = 10;
        $('#board_speed').val(GamePlay.boardSpeed);
        GamePlay.player_one_image = new Image();
        GamePlay.player_one_image.src = "assets/images/FruitBlueBot.png";
        GamePlay.player_two_image = new Image();
        GamePlay.player_two_image.src = "assets/images/FruitPurpleBot.png";
        GamePlay.visitedImg = new Image();
        GamePlay.visitedImg.src = "assets/images/FruitCellVisited.png";
        GamePlay.bothVisitedImg = new Image();
        GamePlay.bothVisitedImg.src = "assets/images/FruitCellVisitedBoth.png";
        GamePlay.oppVisitedImg = new Image();
        GamePlay.oppVisitedImg.src = "assets/images/FruitCellOppVisited.png";
        GamePlay.itemImages[itemImageUrls.length - 1].onload = function(){
            GamePlay.setupNewGame();
        };
        
        // Code added to track games over time
        GamePlay.p1wins = 0;
        GamePlay.p2wins = 0;
        GamePlay.ties = 0;
        

    },
    nextMove: function() {
        if (!GamePlay.gameOver) {
            Board.processMove(); 
            GamePlay.draw();
        } else {
            if (GamePlay.autoplay) {
                // Game is over, and autoplay is on. let's start a new game
                GamePlay.setupNewGame();
            }
        }
    },
    setupNewGame: function(boardNumber) {
        // Create a new board setup according to the following priority:
        // 
        // 1. If a board number is passed in, use that.
        // 2. If the bot has default_board_number() defined, use that.
        // 3. Generate a random board number.
        var nextBoardNum;

        if(boardNumber === undefined) {
            if ( typeof default_board_number == 'function' && !isNaN(parseInt(default_board_number()))) {
                nextBoardNum = default_board_number()
            } else {
                Math.seedrandom();
                nextBoardNum = Math.min(Math.floor(Math.random() * 999999), 999999);
            }
        } else {
            nextBoardNum = boardNumber;
        }

        $('#board_number').val(nextBoardNum);

        Board.init(nextBoardNum);

        Board.newGame();
        GamePlay.itemTypeCount = get_number_of_item_types();
        if (GamePlay.worksafe) {
            // This doesn't seem to actually do anything, but i think it should... leave it the same for now.
            document.getElementById('grid').width = GamePlay.itemTypeCount * 50 + WIDTH * 50;
            document.getElementById('grid').height = HEIGHT * 50;
            document.getElementById('game_view').width = GamePlay.itemTypeCount * 50 + WIDTH * 50;
            document.getElementById('game_view').height = HEIGHT * 50;
        } else {
            
            document.getElementById('grid').width = GamePlay.itemTypeCount * 50 + WIDTH * 50;
            document.getElementById('grid').height = HEIGHT * 50;
            document.getElementById('game_view').width = GamePlay.itemTypeCount * 50 + WIDTH * 50;
            document.getElementById('game_view').height = HEIGHT * 50;
        }

        $('#buttons').css('padding-left', GamePlay.itemTypeCount * 50);
        $('#buttons').css('padding-top', HEIGHT * 50);
        GamePlay.gameOver = false;
        Grid.draw();
        GamePlay.start();
    },
    start: function() {
        if (!GamePlay.autoplay) {
            GamePlay.mode = "pause";
        }
        GamePlay.draw();
    },
    draw: function() {
        var ctx = GamePlay.canvas.getContext('2d');
        ctx.clearRect(0,0,GamePlay.canvas.width,GamePlay.canvas.height);
        if (!GamePlay.worksafe) {
        GamePlay.drawItems(ctx, Board.board, Board.history);
        GamePlay.drawPlayerTwo(ctx, Board.board);
        GamePlay.drawPlayerOne(ctx, Board.board);
        GamePlay.displayScore(ctx, Board.board);
        }
        
        if (GamePlay.mode == "play") {
           var score = Board.checkGameOver();
           Board.checkTimeout();
           if (score !== undefined) {
               if (score > 0) {
                   ctx.font = "30px Arial";
                   ctx.fillStyle = "#000";
                   ctx.fillText("Player 1 wins!", 0, 275);
                   console.log("Player 1 wins!");
                   GamePlay.p1wins += 1;
                   GamePlay.gameOver = true;
               }
               if (score < 0) {
                   ctx.font = "30px Arial";
                   ctx.fillStyle = "#000";
                   ctx.fillText("Player 2 wins!", 0, 275);
                   console.log("Player 2 wins!");
                   GamePlay.p2wins += 1;
                   GamePlay.gameOver = true;
               }
               if (score == 0) {
                   ctx.font = "30px Arial";
                   ctx.fillStyle = "#000";
                   ctx.fillText("Tie!", 0, 275);
                   console.log("Tie!");
                   GamePlay.ties += 1;
                   GamePlay.gameOver = true;
               }
               
               GamePlay.displayMatchPoints(ctx, Board.board);
               
               if (!GamePlay.autoplay) {
                GamePlay.mode = "pause";
                return;
               } else {
                   GamePlay.setupNewGame();
               }
               
           }
           GamePlay.displayMatchPoints(ctx, Board.board);
           Board.processMove();
           setTimeout(function() {GamePlay.draw();}, GamePlay.boardSpeed);
        } else {
           GamePlay.displayMatchPoints(ctx, Board.board);
           GamePlay.mode = "pause";
        }
    },
    displayScore: function(ctx, state) {
        ctx.font = "30px Arial";
        ctx.fillStyle = "#366B76";
        ctx.fillText("Player 1", 0, 50);
        ctx.font = "15px Arial";
        ctx.fillStyle = "#000";
        for (var i=0; i<GamePlay.itemTypeCount; i++) {
            ctx.fillText(Board.myBotCollected[i].toFixed(1), 50*i, 75);
            ctx.drawImage(GamePlay.itemImages[i], 52*i+15, 55, 25, 25);
        }
        ctx.font = "30px Arial";
        ctx.fillStyle = "#82298E";
        ctx.fillText("Player 2", 0, 125);
        ctx.font = "15px Arial";
        ctx.fillStyle = "#000";
        for (var i=0; i<GamePlay.itemTypeCount; i++) {
            ctx.fillText(Board.simpleBotCollected[i].toFixed(1), 50*i, 150);
            ctx.drawImage(GamePlay.itemImages[i], 52*i+15, 130, 25, 25);
        }
        ctx.font = "30px Arial";
        ctx.fillStyle = "#F00";
        ctx.fillText("items left", 0, 200);
        ctx.font = "15px Arial";
        ctx.fillStyle = "#000";
        for (var i=0; i<GamePlay.itemTypeCount; i++) {
            ctx.fillText((Board.totalItems[i]-Board.myBotCollected[i]-Board.simpleBotCollected[i]).toFixed(1), 50*i, 225);
            ctx.drawImage(GamePlay.itemImages[i], 52*i+15, 205, 25, 25);
        }
    },
    displayMatchPoints: function(ctx, state) {
        ctx.font = "18px Arial";
        ctx.fillStyle = "#000";
        ctx.fillText("P1W : T : P2W", 0, 350);
        ctx.font = "18px Arial";
        ctx.fillStyle = "#000";
        ctx.fillText(GamePlay.p1wins.toString() + " : " + GamePlay.ties.toString() + " : " + GamePlay.p2wins.toString(), 0, 375);
    },
    drawPlayerOne: function(ctx, state) {
        ctx.drawImage(GamePlay.player_one_image, GamePlay.itemTypeCount * 50 + Board.myX * 50 + 2, Board.myY * 50 + 2);
    },
    drawPlayerTwo: function(ctx, state) {
        ctx.drawImage(GamePlay.player_two_image, GamePlay.itemTypeCount * 50 + Board.oppX * 50 - 2, Board.oppY * 50 - 2);
    },
    drawItems: function(ctx, state, history) {
        for (var i=0; i<WIDTH; i++) {
            for (var j=0; j<HEIGHT; j++) {
                if (state[i][j] !== 0) {
                    ctx.drawImage(GamePlay.itemImages[state[i][j] - 1], GamePlay.itemTypeCount * 50 + i * 50, j * 50);
                } else if (GamePlay.show_breadcrumbs && history[i][j]==1) {
                    ctx.drawImage(GamePlay.visitedImg, GamePlay.itemTypeCount * 50 + i * 50, j * 50);
                } else if (GamePlay.show_breadcrumbs && history[i][j]==2) {
                    ctx.drawImage(GamePlay.oppVisitedImg, GamePlay.itemTypeCount * 50 + i * 50, j * 50);
                } else if (GamePlay.show_breadcrumbs && history[i][j]==3) {
                    ctx.drawImage(GamePlay.bothVisitedImg, GamePlay.itemTypeCount * 50 + i * 50, j * 50);
                }
            }
        }
    },
    setBoardNumber: function() {
        var boardNumber;

        boardNumber = parseInt($('#board_number').val());
        if (!isNaN(boardNumber)) {
            GamePlay.setupNewGame(boardNumber);
        } else {
            GamePlay.setupNewGame();
        }
    },
    setBoardSpeed: function() {
        var boardSpeed;
        
        boardSpeed = parseInt($('#board_speed').val());
        if (!isNaN(boardSpeed)) {
            GamePlay.boardSpeed = boardSpeed;
        } else {
            GamePlay.boardSpeed = 500;
        }
    }
}
