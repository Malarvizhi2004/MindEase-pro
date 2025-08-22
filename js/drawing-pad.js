const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const canvasWrapper = document.getElementById("canvasWrapper");

let drawing = false;
let erasing = false;
let glowMode = true;
let penColor = document.getElementById("colorPicker").value;
let penSize = document.getElementById("penSize").value;
const history = [];

function setPen() {
  erasing = false;
  glowMode = true;
}

function setNormalPen() {
  erasing = false;
  glowMode = false;
}

function setEraser() {
  erasing = true;
}

function undo() {
  if (history.length > 0) {
    const imageData = history.pop();
    ctx.putImageData(imageData, 0, 0);
  }
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  history.length = 0;
}

function clearTexts() {
  document.querySelectorAll('.drawing-text').forEach(el => el.remove());
}

function saveImage() {
  const link = document.createElement("a");
  link.download = "mood_drawing.png";
  link.href = canvas.toDataURL();
  link.click();
}

function startDraw(x, y) {
  drawing = true;
  ctx.beginPath();
  ctx.moveTo(x, y);
  history.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
}

function draw(x, y) {
  if (!drawing) return;
  ctx.lineWidth = penSize;
  ctx.lineCap = "round";
  ctx.strokeStyle = erasing ? "#ffffff" : penColor;

  if (erasing) {
    ctx.shadowBlur = 0;
  } else {
    ctx.shadowBlur = glowMode ? 6 : 0;
    ctx.shadowColor = penColor;
  }

  ctx.lineTo(x, y);
  ctx.stroke();
}

function endDraw() {
  drawing = false;
  ctx.closePath();
}

canvas.addEventListener("mousedown", e => startDraw(e.offsetX, e.offsetY));
canvas.addEventListener("mousemove", e => draw(e.offsetX, e.offsetY));
canvas.addEventListener("mouseup", endDraw);
canvas.addEventListener("mouseleave", endDraw);

canvas.addEventListener("touchstart", e => {
  const rect = canvas.getBoundingClientRect();
  const touch = e.touches[0];
  startDraw(touch.clientX - rect.left, touch.clientY - rect.top);
});

canvas.addEventListener("touchmove", e => {
  e.preventDefault();
  const rect = canvas.getBoundingClientRect();
  const touch = e.touches[0];
  draw(touch.clientX - rect.left, touch.clientY - rect.top);
}, { passive: false });

canvas.addEventListener("touchend", endDraw);

document.getElementById("colorPicker").addEventListener("input", e => {
  penColor = e.target.value;
  ctx.shadowColor = penColor;
});

document.getElementById("penSize").addEventListener("input", e => penSize = e.target.value);

function addText() {
  const text = prompt("Enter your text:");
  if (!text) return;

  const div = document.createElement("div");
  div.className = "drawing-text";
  div.style.left = `100px`;
  div.style.top = `100px`;
  div.textContent = text;

  div.addEventListener("click", () => {
    if (confirm("Delete this text?")) div.remove();
  });

  let isDragging = false;
  let offsetX, offsetY;

  div.addEventListener("mousedown", e => {
    isDragging = true;
    offsetX = e.offsetX;
    offsetY = e.offsetY;
  });

  document.addEventListener("mousemove", e => {
    if (!isDragging) return;
    const wrapperRect = canvasWrapper.getBoundingClientRect();
    let newX = e.pageX - wrapperRect.left - offsetX;
    let newY = e.pageY - wrapperRect.top - offsetY;

    newX = Math.max(0, Math.min(newX, canvas.width - div.offsetWidth));
    newY = Math.max(0, Math.min(newY, canvas.height - div.offsetHeight));

    div.style.left = `${newX}px`;
    div.style.top = `${newY}px`;
  });

  document.addEventListener("mouseup", () => isDragging = false);

  canvasWrapper.appendChild(div);
}
