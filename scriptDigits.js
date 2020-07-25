const canvas = document.getElementById('main-canvas');
const smallCanvas = document.getElementById('small-canvas');
//const displayBox = document.getElementById('prediction');

const inputBox = canvas.getContext('2d');
const smBox = smallCanvas.getContext('2d');

let isDrawing = false;
let model;

/* Loads trained model */
async function init() {
  model = await tf.loadModel('model/model.json');
  console.log("model loaded");
}

canvas.addEventListener('mousedown', event => {
  isDrawing = true;
  inputBox.strokeStyle = '#4098C9';
  inputBox.lineWidth = '10';
  inputBox.lineJoin = inputBox.lineCap = 'round';
  inputBox.beginPath();
});

canvas.addEventListener('mousemove', event => {
  if (isDrawing) drawStroke(event.clientX, event.clientY);
});

canvas.addEventListener('mouseup', event => {
  isDrawing = false;
  updateDisplay(predict());
});

/* Draws on canvas */
function drawStroke(clientX, clientY) {
  // get mouse coordinates on canvas
  const rect = canvas.getBoundingClientRect();
  const x = clientX - rect.left;
  const y = clientY - rect.top;
  // draw
  inputBox.lineTo(x, y);
  inputBox.stroke();
  inputBox.moveTo(x, y);
}

/* Makes predictions */
function predict() {
  let values = getPixelData();
  let predictions = model.predict(values).dataSync();
  //console.log(predictions);
  return predictions;
}

/* Returns pixel data from canvas after applying transformations */
function getPixelData() {
  smBox.drawImage(inputBox.canvas, 0, 0, smallCanvas.width, smallCanvas.height);
  const imgData = smBox.getImageData(0, 0, smallCanvas.width, smallCanvas.height);
  // preserve and normalize values
  let values = [];
  for (let i = 0; i < imgData.data.length; i += 4) {
    values.push(imgData.data[i] / 255);
  }
  values = tf.reshape(values, [1, 28, 28, 1]);
  return values;
}

var bestPred=null;
/* Displays predictions on screen */
function updateDisplay(predictions) {
  bestPred = predictions.indexOf(Math.max(...predictions));
  console.log(bestPred);//link to the bubbles
  return bestPred;
}

/* Clears canvas */
function erase() {
  inputBox.fillStyle = 'black';
  inputBox.fillRect(0, 0, canvas.width, canvas.height);
}

erase();
init();
