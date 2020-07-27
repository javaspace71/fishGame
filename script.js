/*  SETUP  */
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Constraint = Matter.Constraint,
    Mouse = Matter.Mouse,
    MouseConstraint = Matter.MouseConstraint,
    Composites = Matter.Composites,
    Composite = Matter.Composite,
    Common = Matter.Common,
    World = Matter.World,
    Events = Matter.Events,
    Bodies = Matter.Bodies;
    Body = Matter.Body;
    Sleeping = Matter.Sleeping;

/*  ON START SET ENGINE, WORLD, GRAVITY, RENDER  */
function start(){
  var engine = Engine.create(), world = engine.world;
  engine.world.gravity.y = -1;
  var gravity = engine.world.gravity;

  var render = Render.create({
    //element: document.body,
    canvas: document.querySelector('#myCanvas'),
    engine: engine,
    options: {
      width: 1000,
      height: 751,
      showAngleIndicator: false,
      background: 'Assets/bg.png',
      wireframes: false
    }
  });

  Render.run(render);
  var runner = Runner.create();
  Runner.run(runner, engine);
  var defaultCategory = 0x0001,//TO DO
      noCollisionCategory = 0x002;

/*  STATIC BODIES  */
let sideL = Bodies.rectangle(0,0,1, 1200, { isStatic: true, render: { visible: false} });
let sideR = Bodies.rectangle(800,0,1, 1200, { isStatic: true, render: { visible: false} });
let sideUp = Bodies.rectangle(400, 0, 1200, 1, { isStatic: true, render: { visible: false} });
sideUp.label='sideUp';
let digitArea = Bodies.circle(80,80,80, { isStatic: true, render: { visible: false} });
let seeweed1 = Bodies.rectangle(200, 600, 10, 5, {
  isStatic: true,
  render: {
    sprite: {
      texture: 'Assets/seaweed1.png',
      xScale: 0.6,
      yScale: 0.6,
      yOffset: 0.5
    }
  }
});
let seeweed2 = Bodies.rectangle(750, 600, 10, 5, {
  isStatic: true,
  render: {
    sprite: {
      texture: 'Assets/seaweed2.png',
      xScale: 0.6,
      yScale: 0.6,
      yOffset: 0.5
    }
  }
});
let seeweed3 = Bodies.rectangle(500, 600, 10, 5, {
  isStatic: true,
  render: {
    sprite: {
      texture: 'Assets/seaweed3.png',
      xScale: 0.5,
      yScale: 0.5,
      yOffset: 0.5
    }
  }
});
let seeweed4 = Bodies.rectangle(50, 600, 10, 5, {
  isStatic: true,
  render: {
    sprite: {
      texture: 'Assets/seaweed4.png',
      xScale: 0.6,
      yScale: 0.6,
      yOffset: 0.5
    }
  }
});
let seeweed5 = Bodies.rectangle(570, 600, 10, 5, {
  isStatic: true,
  render: {
    sprite: {
      texture: 'Assets/seaweed5.png',
      xScale: 0.5,
      yScale: 0.5,
      yOffset: 0.5
    }
  }
});
let seeweed6 = Bodies.rectangle(370, 600, 10, 5, {
  isStatic: true,
  render: {
    sprite: {
      texture: 'Assets/seaweed6.png',
      xScale: 0.4,
      yScale: 0.4,
      yOffset: 0.45
    }
  }
});
let seeweed7 = Bodies.rectangle(210, 600, 10, 5, {
  isStatic: true,
  render: {
    sprite: {
      texture: 'Assets/seaweed7.png',
      xScale: 0.35,
      yScale: 0.35,
      yOffset: 0.45
    }
  }
});

/*  BUBBLE BODIES  */
var bubbleRadius;
var mContraint;
var fish=null;
var bubbles =[];
var fishbubbles = [];
var bubblesImg = [
  {image: 'Assets/bubble2.png', addsTo: 2},
  {image: 'Assets/bubble3.png', addsTo: 3},
  {image: 'Assets/bubble4.png', addsTo: 4},
  {image: 'Assets/bubble5.png', addsTo: 5},
  {image: 'Assets/bubble6.png', addsTo: 6},
  {image: 'Assets/bubble7.png', addsTo: 7},
  {image: 'Assets/bubble7b.png', addsTo: 7},
  {image: 'Assets/bubble8.png', addsTo: 8},
  {image: 'Assets/bubble8b.png', addsTo: 8},
  {image: 'Assets/bubble9.png', addsTo: 9},
  {image: 'Assets/bubble9b.png', addsTo: 9},
  {image: 'Assets/bubble9c.png', addsTo: 9}];
var bubblesFishImg = [
  'Assets/Fish1.svg',
  'Assets/Fish2.svg',
  'Assets/Fish3.svg',
  'Assets/Fish4.svg',
  'Assets/Fish5.svg'];
var fishImg = [
  'Assets/fish1.png',
  'Assets/fish2.png',
  'Assets/fish3.png',
  'Assets/fish4.png',
  'Assets/fish5.png'];

function createBubbles(type, n){
  for (var i=0;i<n;i++){
    var randomNum = Math.floor(Math.random() * type.length);
    bubbleRadius = randomNum*3+30;
    var bubbleBody = Bodies.circle(400,600, bubbleRadius , {
      restitution: 0.6,
      friction: 0.1,
      render: {
        sprite: {
          texture: type[randomNum].image,
          xScale: 0.0015*bubbleRadius,
          yScale: 0.0015*bubbleRadius
        }
      }
    });
    bubbleBody.label = type[randomNum].addsTo;
    bubbles.push(bubbleBody);
  }
  return bubbles;
}

function createFishBubbles(type, n){
  for (var i=0;i<n;i++){
    var randomNum = Math.floor(Math.random() * type.length);
    bubbleRadius = randomNum*3+30;
    var bubbleBody = Bodies.circle(400,800, bubbleRadius , {
      restitution: 0.6,
      friction: 0.1,
      render: {
        sprite: {
          texture: type[randomNum],
          xScale: 0.014*bubbleRadius,
          yScale: 0.014*bubbleRadius
        }
      }
    });
    bubbleBody.label = "fish";
    fishbubbles.push(bubbleBody);
  }
  return fishbubbles;
}

createBubbles(bubblesImg, 30);
createFishBubbles(bubblesFishImg, 5);

/*  GENERATING FISH  */
function createFish(n){
  fish = Bodies.rectangle(200,200,80,40,{
    restitution: 0.6,
    friction: 0.1,
    angle: 0,
    render: {
      sprite: {
        texture: n,
        xScale: 0.1,
        yScale: 0.1
      }
    }
  });
  console.log(fish);
  console.log(fish.body);
  World.add(world, fish);
  return fish;
}

/*  MOUSE CONSTRAINT - for construction purposes, need to be removed for final version  */
var mouse = Mouse.create(render.canvas);
mConstraint = MouseConstraint.create(engine, {
  mouse: mouse,
  contraint: {
    stiffness: 20,
    render: {
      visible: false
    }
  }
});

var mEvent = Events.on(mConstraint, "mousedown", function(error){
  if(mConstraint.body!==null){
    if(mConstraint.body.label==="fish"){
      switch(mConstraint.body.render.sprite.texture){
        case bubblesFishImg[0]:
          createFish(fishImg[0]);
          break;
        case bubblesFishImg[1]:
          createFish(fishImg[1]);
          break;
        case bubblesFishImg[2]:
          createFish(fishImg[2]);
          break;
        case bubblesFishImg[3]:
          createFish(fishImg[3]);
          break;
        case bubblesFishImg[4]:
          createFish(fishImg[4]);
          break;
        case bubblesFishImg[5]:
          createFish(fishImg[5]);
          break;
      }
    }
    World.remove(world, mConstraint.body);
  }
});

render.mouse = mouse;
Render.lookAt(render, {
    min: { x: 0, y: 0 },
    max: { x: 800, y: 600 }
});
}

/*  LINKING BESTPRED NUMBER FROM DIGIT RECOGNITION  */
Events.on(engine, "beforeUpdate", function(error){
  if(bestPred!=null){
    for(var i=0;i<Composite.allBodies(world).length;i++){
      if(Composite.allBodies(world)[i].label === bestPred){
        console.log(Composite.allBodies(world)[i]);
        World.remove(world, Composite.allBodies(world)[i]);
      }
    }
  }
  bestPred=null;
});

/*  FISH GRAVITY - to be reworked  */
Events.on(engine, "beforeUpdate", function(error){
  if(fish!==null){
    Body.applyForce(fish, fish.position, {
      x: -gravity.x * gravity.scale * fish.mass*1.2,
      y: -gravity.y * gravity.scale * fish.mass*1.2
    });
  }
});

/*  SORTING FISH - to improve with better organization/retreival of data  */
function sortFish(spriteFish){
  switch(spriteFish){
    case bubblesFishImg[0]:
      createFish(fishImg[0]);
      break;
    case bubblesFishImg[1]:
      createFish(fishImg[1]);
      break;
    case bubblesFishImg[2]:
      createFish(fishImg[2]);
      break;
    case bubblesFishImg[3]:
      createFish(fishImg[3]);
      break;
    case bubblesFishImg[4]:
      createFish(fishImg[4]);
      break;
    case bubblesFishImg[5]:
      createFish(fishImg[5]);
      break;
  }
}

/*  MONITORING COLLISION FISH BUBBLE vs UP WALL  */
Events.on(engine, 'collisionStart', function(event) {
  var pairs = event.pairs;
  for(var i=0;i<pairs.length;i++){
    if ((pairs[i].bodyA.label == "fish") && (pairs[i].bodyB.label == "sideUp")){
      var spriteFish = (pairs[i].bodyA.render.sprite.texture);
      console.log(spriteFish);
      sortFish(spriteFish);
      World.remove(world, pairs[i].bodyA);
    }
    else if((pairs[i].bodyB.label == "fish") && (pairs[i].bodyA.label == "sideUp")){
      var spriteFish = (pairs[i].bodyB.render.sprite.texture);
      console.log(spriteFish);
      sortFish(spriteFish);
      World.remove(world, pairs[i].bodyB);
    }
  }
});

/* ADD BODIES TO THE WORLD  */
World.add(world, [digitArea, sideL, sideR, sideUp, seeweed1, seeweed2, seeweed3 ,seeweed4, seeweed5, seeweed6, seeweed7]);
World.add(world, bubbles);
World.add(world, fishbubbles);
World.add(world, mConstraint);
