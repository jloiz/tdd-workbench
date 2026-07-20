# Requirements and Game Rules

Below follows an analysis and definition of the requirement/game rules of tetris, as defined in level-0.md

## Game Rules
- The game of tetris is played on a board
- A game has a score
- The game board is rectangular with the long edge on the vertical
- In the game board there exists shapes
- A shape is made up of 4 squares with sides of unit length
- A shape's starting position on the board is at the top, with the top edge of the shape, boardering the top edge of the board
- A Shape moves vertically down the board one unit length at a per unit time
- Only one full shape may be moving downwards
- The only shape a player can control is the shape moving downwards
- A shape may move left or right at any time
- A shape may rotate 90 degrees left or right at amy time
- A shape stops falling when the bottom of edge of a shape **in it's current orientation** when:
    - Touches the bottom edge of the board
    - Touches any part of the top edge of another shape
- A shape may immediately move to the lowest position as allowed from the previous rule
- The fall rate of a shape may be increased 
- When shape stops moving a new one is spawned
- The games is over when a shape cannot spawn without overlapping another shape
- When the squares of a shape are alligned such that they fill the board horizontally that row of shapes is removed and 
- Multiple rows may be removed simulataneously 
- When a row is cleared all squares above them are joined into groups. These groups fall until they hit the top of any square or the bottom of the board c.f.: https://harddrop.com/wiki/Line_clear
- When a row is removed the player is awarded ***
- Shapes may be one of the following: 

| Name | Shape |
| ---- | -------------------------------- |
| I    | ####                             |
| O    | ##<br/>##                        |
| T    | ###<br/>&nbsp;&nbsp;#            |
| J    | ###<br>&nbsp;&nbsp;&nbsp;&nbsp;# |
| L    | ###<br/>#                        |
| S    | &nbsp;&nbsp;##<br/>##            |
| Z    | ##<br/>&nbsp;&nbsp;##            |


| Name   | I    | O            | T                     | J                                 | L         | S                     | Z                     |
|--------|------|--------------|-----------------------|-----------------------------------|-----------|-----------------------|-----------------------|
| Shape  | #### | ##<br/>##    | ###<br/>&nbsp;&nbsp;# | ###<br/>&nbsp;&nbsp;&nbsp;&nbsp;# | ###<br/># | &nbsp;&nbsp;##<br/>## | ##<br/>&nbsp;&nbsp;## |



## Requirements

- There needs to be a game board 
- The game needs to have a current state
- When the game state changes the board needs to be redrawn
- There needs to be requirement to display the score
- When the score changes the score display needs to be updated
- A player needs to be able to move shapes horixontally
- A player needs to be able to rotate a shape
- A player needs to be able to increase the fall rate of a shape
- A player needs to hard drop a shape 
- There needs to be a logic to randomly spawn shapes
- There needs to be a logic to clear a line and increment the score
- As a visual aid a set of colours should be used to differentiate the shapes
- There needs to be a window next to the board to display the next shape to be spawned
- A pause functionality is desireable


## High level, intial but likely incorrect, design

- A clock needed for the incrementation of the game state
- A unit time defined using this clock to be the reference point for
the game pace. The pace is anchored as one unit time being the time in which a shape moved one unit length vertically downwards at regular speed. 
- Shapes are to be objects with the relevant properties (e.g., speed, shape, position[maybe positions of constituent squares])
- The board is redrawn continuously
- There needs to be some keyboard input the player moves
- Squares need their own implementation as objects
- Board can be defined as a grid and the squares sit in this grid
- Properties of the grid state define row clearing and game over conditions
- Score and score display can be a simple implementation