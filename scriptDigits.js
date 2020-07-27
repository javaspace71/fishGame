const canvas = document.getElementById('main-canvas');
const smallCanvas = document.getElementById('small-canvas');
const inputBox = canvas.getContext('2d');
const smBox = smallCanvas.getContext('2d');

let isDrawing = false;
let model;

/* LOAD THE TRAINED MODEL */
async function init() {
  model = await tf.loadModel('model/model.json');
  console.log("model loaded");
  erase();
}

/* IN CANVAS: MOUSEDOWN DRAW PATH */
canvas.addEventListener('mousedown', event => {
  isDrawing = true;
  inputBox.strokeStyle = '#C5E9E9';
  inputBox.lineWidth = '15';
  inputBox.lineJoin = inputBox.lineCap = 'round';
  inputBox.beginPath();
});

/* IN CANVAS: MOUSEMOVE UPDATE X/Y POSITIONS AND DRAW */
canvas.addEventListener('mousemove', event => {
  if (isDrawing) drawStroke(event.clientX, event.clientY);
});

/* IN CANVAS: MOUSEUP STOP DRAWING START PREDICTING */
canvas.addEventListener('mouseup', event => {
  isDrawing = false;
  updateDisplay(predict());
});

/* DRAW */
function drawStroke(clientX, clientY) {
  const rect = canvas.getBoundingClientRect();//Get mouse coordinates on canvas
  const x = clientX - rect.left;
  const y = clientY - rect.top;
  inputBox.lineTo(x, y);
  inputBox.stroke();
  inputBox.moveTo(x, y);
}

/* PREDICT */
function predict() {
  let values = getPixelData();
  let predictions = model.predict(values).dataSync();
  //console.log(predictions);
  return predictions;
}

/* TRANSFORM INPUT TO BE READABLE BY MODEL */
function getPixelData() {
  smBox.drawImage(inputBox.canvas, 0, 0, smallCanvas.width, smallCanvas.height);
  const imgData = smBox.getImageData(0, 0, smallCanvas.width, smallCanvas.height);
  let values = [];
  //Keep and normalize values
  for (let i = 0; i < imgData.data.length; i += 4) {
    values.push(imgData.data[i] / 255);
  }
  values = tf.reshape(values, [1, 28, 28, 1]);
  return values;
}

var bestPred=null;

/* RETURN BEST PREDICTION */
function updateDisplay(predictions) {
  bestPred = predictions.indexOf(Math.max(...predictions));
  console.log(bestPred);
  return bestPred;
}

/* CLEARS CANVAS */
function erase() {
  inputBox.clearRect(0, 0, canvas.width, canvas.height);
  //let bg = new Image();
  //    bg.src = 'Assets/bubbleDigitheight.png';
  //var pat = inputBox.createPattern(bg, "no-repeat");
  inputBox.fillStyle = '#1D2D87';
  inputBox.fillRect(0,0,canvas.width, canvas.height);
  //inputBox.rect(0, 0, canvas.width, canvas.height);
  //inputBox.fill();
}

erase();
init();
