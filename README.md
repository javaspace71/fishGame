# Math Fish Game
Tensorflow.js/Matter.js

https://mal2333.github.io/fishGame/

Try to free all of the fishes! Write your addition answers in the dark blue bubble and see the bubbles pop for every correct answer.

![fish][fish1] ![seweed][seeweed1] ![fish][fish2] ![seweed][seeweed2] ![fish][fish3]
[fish1]: https://github.com/mal2333/fishGame/blob/master/Assets/fish1.png
[fish2]: https://github.com/mal2333/fishGame/blob/master/Assets/fish2.png
[fish3]: https://github.com/mal2333/fishGame/blob/master/Assets/fish4.png
[seeweed1]: https://github.com/mal2333/fishGame/blob/master/Assets/seaweed1.png
[seeweed2]: https://github.com/mal2333/fishGame/blob/master/Assets/seaweed2.png


### Game's objectives
Math game for KG aged children based on the idea of mixing physical manipulation, math skills and technology.
- Original aim:
    -  Input: webcam
    -  Detecting hand written digits (based on MNIST database and pretrained models). As it only detects one digit at a time we would need to retrain some object classification model... which seem feasible on tensorflow but not tensorflow.js.
    -  Simplifying by using number tiles rather than handwritten digits, but again we would need use transfer learning on an object classification model.
    - Link the physical element (physical manipulation) with the game interface
    - Aim: popping as many bubbles to free the fishes. Those latter ones rise to the surface and pop once reaching the top.
- Accomplished:
    - Using MNIST and a Keras pretrained model converted to use with Tensorflow.js.
    - Write the number on a canvas (with the mouse), modify the data to match the correct input for the model (28x28px).
    - Get the `bestPred` from the model, and get the game to recognize the integer.
    - Game created in `Matter.js`.
- To do:
    - [ ] Categories of non colliding objects (seeweed vs. bubbles/fishes)
    - [ ] Reversed gravity for fishes to sink once bubbles popped
    - [ ] Movement (swimming) once fishes reach bottom of ocean
<br>

## SCRIPT.JS

1. Matter.js set up
2. Floating bubbles: gravity = -1
3. Rendering a canvas at #myCanvas
4. Categories define the collision status of the different objects - **to create**
  1. Fishes don't collide together or with the seeweed, but do with the walls
  2. Bubbles collide together
5. Bodies
  1. Static: walls, seeweeds
  2. Moveable:
    1. Addition bubbles with labels to recognize for additions
    2. Fish bubbles with labels to determine which sprite to use generate the fish
    3. Fishes once bubbles popped
6. Mouse constraints (popping bubbles and removing bodies first step in building the game)
7. Linking the digit recognized in the canvas (ML model)
8. Adding forces to the fishes (sink and swim) - **to create**
9. Monitoring collisions between bodies
<br>

## SCRIPTDIGITS.JS

1. Load the trained model
2. Canvas drawing: `mousedown`, `mousemove`, `mouseup`, and `draw()`
3. Transform our input into a readable input for our model (correct format: 28x28) and shape it into a tensor
4. Get predict from the model - array of predictions with confidence
5. Get the highest prediction and return it (to be found in our game)
6. Clear canvas to draw again
