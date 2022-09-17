# Snakes-Apples
A fun game in which you move your snake about on a grid, collect apples and make your snake the longest in the land.
Be carefull not to touch yourself or the edge of the grid else you will perish and require to start over as just a wee slitherer!


When the page is loaded a modal appears telling you how to play and has a button that closes the modal.

When the modal is closed you can then use the arrow keys to move the snake on the grid.

I was able to make it so you can't switch directions on a dime i.e. you can't be going left and then go right visa versa and same thing when moving up or down.
I used a request animation frame to render how much time is needed in order to move the snake from one grid space to the next.
the snake itself is styled in css and then in js attached to a created div in js and then appended to the grid, same thing with the apple.
I then made it so you could eat the apple and grow by 1 grid space.
I then created a "barrier" essentially making it so if the snake trys to go off the grid or touches itself then a message is displayed on the top of the screen that the game is over and the modal reappears with the welcome message and info on how to play.
