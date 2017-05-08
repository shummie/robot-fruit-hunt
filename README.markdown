## Please Note
This is a fork of optimizely's [robot-fruit-hunt] (https://github.com/optimizely/robot-fruit-hunt). Scribd's [robot-fruit-hunt](https://github.com/scribd/robot-fruit-hunt). Modifications here allow two human-written bots to play each other instead of relying on SimpleBot.

## Welcome!

While not completely automated, hopefully this can evolve and be set up to allow for easy 1v1 battles between two bots. In order to get this to work properly, you'll have to modify certain files for new bots.

game.local.html: You'll have to add the source file for your bot.

player_1.js and player_2.js: You will need to change the namespace of the bot in order to use your bot. Note that due to how the local version of the game is set up, get_my_x and get_my_opponent_x refers to player 1 and player 2's positions respectively. You will need to make sure that your newGame function in your bot takes the player number as a parameter so that it knows what coordinates to use. Please refer to SimpleBot and RandomBot for examples.

botfile itself: As referenced above, you will need to make sure that you have a separate namespace for your bot. For submission (I haven't tested this yet), you should be able to just add in the player_1 code to your bot and then submit it as a single file.

## From original documentation: 

Modify mybot.js to start writing your bot. Opening game.html will allow you to generate random boards, and either watch your bot play or step through one move at a time. Refer [here](http://fruitbots.org/api/api) for available methods. gl/hf! - Scribd.