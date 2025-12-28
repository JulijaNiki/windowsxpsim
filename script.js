// Start Button Toggle
const startBtn = document.getElementById("startBtn");
const startMenu = document.getElementById("startMenu");

startBtn.addEventListener("click", () => {
  startMenu.style.display = startMenu.style.display === "block" ? "none" : "block";
});

// Close start menu if click outside
document.addEventListener("click", e => {
  if (!startBtn.contains(e.target) && !startMenu.contains(e.target)) {
    startMenu.style.display = "none";
  }
});

// Clock
function updateClock() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  document.getElementById("clock").textContent = `${hours}:${minutes}`;
}
updateClock();
setInterval(updateClock, 1000);

// Desktop icons data
const desktop = document.getElementById('desktop');

const icons = [
  {
    title: 'Internet Explorer',
    img: 'https://www.marketplace.org/wp-content/uploads/2020/08/Windows_Internet_Explorer_Logo.png',
    url: './windowifarme/ie.html'
  },
  {
    title: 'Photoshop CS6',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Adobe_Photoshop_CS6_icon.svg/1200px-Adobe_Photoshop_CS6_icon.svg.png',
    url: 'https://www.photopea.com'
  },
  {
    title: 'My Computer',
    img: './icons/computer.png',
    url: ''
  },
  {
    title: 'Recycle Bin',
    img: './icons/recycle.png',
    url: ''
  },
   {
    title: 'Paint',
    img: './icons/paint.png',
    url: 'https://jspaint.app/'
  },
     {
    title: 'Solitaire',
    img: './icons/sol.png',
    url: 'https://98.js.org/programs/js-solitaire/index.html'
  },
];

let topZ = 1000; // for window stacking

// Function to bring window to front
function bringToFront(win) {
  topZ++;
  win.style.zIndex = topZ;
}

// Generate icons and windows
icons.forEach(iconData => {
  // Create desktop icon
  const icon = document.createElement('div');
  icon.classList.add('icon');
  icon.dataset.title = iconData.title;
  icon.dataset.url = iconData.url;
  icon.innerHTML = `
    <img src="${iconData.img}" alt="${iconData.title}">
    <span>${iconData.title}</span>
  `;
  desktop.appendChild(icon);

  // Only create window if URL exists
  if (iconData.url) {
    const win = document.createElement('div');
    win.classList.add('window');
    win.style.display = 'none';
    win.innerHTML = `
      <div class="window-header">
        <span>${iconData.title}</span>
        <div class="window-buttons">
               <button class="minize-btn" aria-label="Minimize">_</button>
          <button class="maximize-btn" aria-label="Maximize">⬜</button>
          <button class="close-btn" aria-label="Close">X</button>
        </div>
      </div>
      <iframe src="${iconData.url}" style="width:100%; height: calc(100% - 30px); border:none;"></iframe>
    `;
    document.body.appendChild(win);

    const header = win.querySelector('.window-header');

    const maximizeBtn = win.querySelector('.maximize-btn');
    const closeBtn = win.querySelector('.close-btn');

    // Open window on double-click
    icon.addEventListener('dblclick', () => {
      win.style.display = 'block';
      bringToFront(win);
    });

    // Close window
    closeBtn.addEventListener('click', () => {
      win.style.display = 'none';
    });

    // Maximize / Restore
    maximizeBtn.addEventListener('click', () => {
      win.classList.toggle('maximized');
      bringToFront(win);
    });

    // Dragging
    let isDragging = false, offsetX, offsetY;
    header.addEventListener('mousedown', e => {
      isDragging = true;
      offsetX = e.clientX - win.offsetLeft;
      offsetY = e.clientY - win.offsetTop;
      bringToFront(win);
    });
    document.addEventListener('mouseup', () => isDragging = false);
    document.addEventListener('mousemove', e => {
      if (isDragging && !win.classList.contains('maximized')) {
        win.style.left = `${e.clientX - offsetX}px`;
        win.style.top = `${e.clientY - offsetY}px`;
      }
    });
  }
});
const btn = document.getElementById("startBtn");

btn.addEventListener("click", () => {
  btn.classList.toggle("active");

});

