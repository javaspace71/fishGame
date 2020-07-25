var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Constraint = Matter.Constraint,
    Mouse = Matter.Mouse,
    MouseConstraint = Matter.MouseConstraint,
    Composites = Matter.Composites,
    Common = Matter.Common,
    World = Matter.World,
    Events = Matter.Events,
    Bodies = Matter.Bodies;
    Sleeping = Matter.Sleeping;

function start(){
var engine = Engine.create(), world = engine.world;
engine.world.gravity.y = -1;
var gravity = engine.world.gravity;

var render = Render.create({
  //element: document.body,
  canvas: document.querySelector('#myCanvas'),
  engine: engine,
  options: {
    width: 800,
    height: 600,
    showAngleIndicator: false,
    background: 'Assets/bg2.png',
    wireframes: false
  }
});

Render.run(render);
var runner = Runner.create();
Runner.run(runner, engine);
var defaultCategory = 0x0001,
    noCollisionCategory = 0x002;

// add bodies
let sideL = Bodies.rectangle(0,0,1, 1200, { isStatic: true, render: { visible: false} });
let sideR = Bodies.rectangle(800,0,1, 1200, { isStatic: true, render: { visible: false} });
let sideUp = Bodies.rectangle(400, 0, 1200, 1, { isStatic: true, render: { visible: false} });
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

var bubbleRadius;
var bubbles =[];
var fishbubbles = [];
var bubblesImg = ['Assets/bubble2.png', 'Assets/bubble3.png', 'Assets/bubble4.png', 'Assets/bubble5.png', 'Assets/bubble6.png', 'Assets/bubble7.png', 'Assets/bubble7b.png', 'Assets/bubble8.png', 'Assets/bubble8b.png','Assets/bubble9.png', 'Assets/bubble9b.png', 'Assets/bubble9c.png'];
var bubblesFishImg = ['Assets/Fish1.svg', 'Assets/Fish2.svg', 'Assets/Fish3.svg', 'Assets/Fish4.svg', 'Assets/Fish5.svg'];
var fishImg = ['Assets/fish1.png', 'Assets/fish2.png', 'Assets/fish3.png', 'Assets/fish4.png', 'Assets/fish5.png'];
var mContraint;
var fish;

function createBubbles(type, n){
  for (var i=0;i<n;i++){
    var randomNum = Math.floor(Math.random() * type.length);
    bubbleRadius = randomNum*3+30;
    bubbles.push(Bodies.circle(400,600, bubbleRadius , {
      restitution: 0.6,
      friction: 0.1,
      render: {
        sprite: {
          texture: type[randomNum],
          xScale: 0.0015*bubbleRadius,
          yScale: 0.0015*bubbleRadius
        }
      }
    }));
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
  //console.log(fish);
  World.add(world, fish);
  return fish;
}


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
  console.log(bestPred);
  if(mConstraint.body!==null){
    //console.log(mConstraint.body);
    //console.log(mConstraint.body.label);
    //console.log(mConstraint.body.render.sprite.texture);

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

createBubbles(bubblesImg, 30);
createFishBubbles(bubblesFishImg, 5);
World.add(world, [sideL, sideR, sideUp, seeweed1, seeweed2, seeweed3 ,seeweed4, seeweed5, seeweed6, seeweed7]);
World.add(world, bubbles);
World.add(world, fishbubbles);
World.add(world, mConstraint);

render.mouse = mouse;
Render.lookAt(render, {
    min: { x: 0, y: 0 },
    max: { x: 800, y: 600 }
});
}
