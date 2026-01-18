Build a Golf Score Translator
In the game of Golf, each hole has a par, meaning the average number of strokes a golfer is expected to make in order to sink the ball in the hole to complete the play. Depending on how far above or below par your strokes are, there is a different nickname.

In this lab, you will write a function that converts the par and strokes to their nickname.

Objective: Fulfill the user stories below and get all the tests to pass to complete the lab.

User Stories:

You should create a function named golfScore.
golfScore should take two numeric arguments, which are the par for the course and the amount of strokes made.
golfScore should return a string.
golfScore should return "Hole-in-one!" if strokes is 1.
golfScore should return "Eagle" if strokes is less than or equal to par minus 2.
golfScore should return "Birdie" if strokes is equal to par minus 1.
golfScore should return "Par" if strokes is equal to par.
golfScore should return "Bogey" if strokes is equal to par plus 1.
golfScore should return "Double Bogey" if strokes is equal to par plus 2.
golfScore should return "Go Home!" if strokes is greater than or equal to par plus 3.