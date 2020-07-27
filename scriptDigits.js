const canvas = document.getElementById('main-canvas');
const smCanvas = document.getElementById('small-canvas');
const inBox = canvas.getContext('2d');
const smBox = smCanvas.getContext('2d');
var isDrawing = false;
var model;
var bestPred=null;

/* LOAD THE TRAINED MODEL */
async function init() {
  model = await tf.loadModel('model/model.json');
  console.log("Model loaded");
}

/* IN CANVAS: MOUSEDOWN DRAW PATH */
canvas.addEventListener('mousedown', event => {
  isDrawing = true;
  inBox.strokeStyle = '#C5E9E9';
  inBox.lineWidth = '12';
  inBox.lineJoin = inBox.lineCap = 'round';
  inBox.beginPath();
});

/* IN CANVAS: MOUSEMOVE UPDATE X/Y POSITIONS AND DRAW */
canvas.addEventListener('mousemove', event => {
  if (isDrawing) drawStroke(event.clientX, event.clientY);
});

/* IN CANVAS: MOUSEUP STOP DRAWING START PREDICTING */
canvas.addEventListener('mouseup', event => {
  isDrawing = false;
  bestPrediction(predict());
});

/* DRAW */
function drawStroke(clientX, clientY) {
  const rect = canvas.getBoundingClientRect();//Get mouse coordinates on canvas
  const x = clientX - rect.left;
  const y = clientY - rect.top;
  inBox.lineTo(x, y);
  inBox.stroke();
  inBox.moveTo(x, y);
}

/* TRANSFORM INPUT TO BE READABLE BY MODEL */
function getPixelData() {
  smBox.drawImage(inBox.canvas, 0, 0, smCanvas.width, smCanvas.height);
  const imgData = smBox.getImageData(0, 0, smCanvas.width, smCanvas.height);
  var values = [];
  for (var i = 0; i < imgData.data.length; i += 4) {
    values.push(imgData.data[i] / 255);
  }
  values = tf.reshape(values, [1, 28, 28, 1]);
  return values;
}

/* PREDICT */
function predict() {
  var values = getPixelData();
  var predictions = model.predict(values).dataSync();
  return predictions;
}

/* RETURN BEST PREDICTION */
function bestPrediction(predictions) {
  bestPred = predictions.indexOf(Math.max(...predictions));
  console.log(bestPred);
  return bestPred;
}

/* CLEARS CANVAS */
function erase() {
  inBox.clearRect(0, 0, canvas.width, canvas.height);
  inBox.fillStyle = '#1D2D87';
  inBox.fillRect(0,0,canvas.width, canvas.height);
}

erase();
init();
