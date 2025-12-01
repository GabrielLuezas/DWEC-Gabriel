// DOM Elements
const authContainer = document.getElementById("auth-container");
const loginView = document.getElementById("login-view");
const registerView = document.getElementById("register-view");
const adminDashboard = document.getElementById("admin-dashboard");
const gameSetup = document.getElementById("game-setup");
const gameContainer = document.getElementById("game-container");
const gameOver = document.getElementById("game-over");
const gameArea = document.getElementById("game-area");

// Auth Inputs
const loginUsername = document.getElementById("login-username");
const loginPassword = document.getElementById("login-password");
const loginBtn = document.getElementById("login-btn");
const loginMessage = document.getElementById("login-message");
const showRegisterLink = document.getElementById("show-register");

const regUsername = document.getElementById("reg-username");
const regPassword = document.getElementById("reg-password");
const regRol = document.getElementById("reg-rol");
const registerBtn = document.getElementById("register-btn");
const regMessage = document.getElementById("reg-message");
const showLoginLink = document.getElementById("show-login");

// Admin Elements
const usersList = document.getElementById("users-list");
const adminLogoutBtn = document.getElementById("admin-logout");

// Game Elements
const ballCountInput = document.getElementById("ball-count");
const maxBallsSpan = document.getElementById("max-balls");
const startGameBtn = document.getElementById("start-game-btn");
const setupMessageP = document.getElementById("setup-message");
const gameLogoutBtn = document.getElementById("game-logout");

const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const replayBtn = document.getElementById("replay-btn");
const backMenuBtn = document.getElementById("back-menu-btn");
// Modal Elements
const editModal = document.getElementById("edit-modal");
const editOriginalUsername = document.getElementById("edit-original-username");
const editPassword = document.getElementById("edit-password");
const editScore = document.getElementById("edit-score");
const editRol = document.getElementById("edit-rol");
const saveEditBtn = document.getElementById("save-edit-btn");
const cancelEditBtn = document.getElementById("cancel-edit-btn");

// State
let currentUserObj = null;
let score = 0;
let balls = [];
let gameInterval = null;
const BALL_SIZE = 50;

// Init
const today = new Date().getDate();
maxBallsSpan.textContent = today;

// Navigation
showRegisterLink.addEventListener("click", (e) => {
  e.preventDefault();
  loginView.classList.add("hidden");
  registerView.classList.remove("hidden");
  loginMessage.textContent = "";
});

showLoginLink.addEventListener("click", (e) => {
  e.preventDefault();
  registerView.classList.add("hidden");
  loginView.classList.remove("hidden");
  regMessage.textContent = "";
});

// Auth Logic
registerBtn.addEventListener("click", () => {
  const user = regUsername.value;
  const pass = regPassword.value;
  const rol = regRol.value;

  if (!user || !pass) {
    regMessage.textContent = "Rellena todos los campos.";
    return;
  }

  let users = JSON.parse(localStorage.getItem("users") || "{}");
  if (users[user]) {
    regMessage.textContent = "El usuario ya existe.";
  } else {
    // Create new Usuario object using the class from Usuario.js
    const newUser = new Usuario(user, pass, rol);
    users[user] = newUser;
    localStorage.setItem("users", JSON.stringify(users));
    regMessage.textContent = "Registrado correctamente. Inicia sesión.";
    regMessage.style.color = "green";
    setTimeout(() => {
      registerView.classList.add("hidden");
      loginView.classList.remove("hidden");
      regMessage.textContent = "";
      regMessage.style.color = "red";
    }, 1500);
  }
});

loginBtn.addEventListener("click", () => {
  const user = loginUsername.value;
  const pass = loginPassword.value;
  let users = JSON.parse(localStorage.getItem("users") || "{}");

  if (users[user] && users[user].contrasena === pass) {
    currentUserObj = users[user];
    loginUsername.value = "";
    loginPassword.value = "";

    if (currentUserObj.rol === "admin") {
      showAdminDashboard();
    } else {
      showGameSetup();
    }
  } else {
    loginMessage.textContent = "Credenciales incorrectas.";
  }
});

function showAdminDashboard() {
  authContainer.classList.add("hidden");
  adminDashboard.classList.remove("hidden");
  renderUsersTable();
}

function showGameSetup() {
  authContainer.classList.add("hidden");
  gameSetup.classList.remove("hidden");
  gameContainer.classList.add("hidden");
  gameOver.classList.add("hidden");
  ballCountInput.value = "";
  setupMessageP.textContent = "";
}

// ... (existing auth logic) ...

function logout() {
  currentUserObj = null;
  authContainer.classList.remove("hidden");
  // Default to Register view as requested
  loginView.classList.add("hidden");
  registerView.classList.remove("hidden");

  adminDashboard.classList.add("hidden");
  gameSetup.classList.add("hidden");
  gameContainer.classList.add("hidden");
  gameOver.classList.add("hidden");
}

adminLogoutBtn.addEventListener("click", logout);
gameLogoutBtn.addEventListener("click", logout);
backMenuBtn.addEventListener("click", () => {
  gameContainer.classList.add("hidden");
  gameOver.classList.add("hidden");
  showGameSetup();
});

// Admin Logic
function renderUsersTable() {
  usersList.innerHTML = "";
  let users = JSON.parse(localStorage.getItem("users") || "{}");

  for (const username in users) {
    const u = users[username];
    const tr = document.createElement("tr");

    tr.innerHTML = `
            <td>${u.usuario}</td>
            <td>${u.rol}</td>
            <td>${u.puntuacion}</td>
            <td>
                <button onclick="openEditModal('${u.usuario}')">Editar</button>
                <button onclick="deleteUser('${u.usuario}')" style="background:red; color:white;">Eliminar</button>
            </td>
        `;
    usersList.appendChild(tr);
  }
}

// Modal Logic
window.openEditModal = function (username) {
  let users = JSON.parse(localStorage.getItem("users") || "{}");
  const u = users[username];

  editOriginalUsername.value = u.usuario;
  editPassword.value = u.contrasena;
  editScore.value = u.puntuacion;
  editRol.value = u.rol;

  editModal.classList.remove("hidden");
};

cancelEditBtn.addEventListener("click", () => {
  editModal.classList.add("hidden");
});

saveEditBtn.addEventListener("click", () => {
  const username = editOriginalUsername.value;
  const newPass = editPassword.value;
  const newScore = parseInt(editScore.value);
  const newRol = editRol.value;

  let users = JSON.parse(localStorage.getItem("users") || "{}");
  if (users[username]) {
    users[username].contrasena = newPass;
    users[username].puntuacion = newScore;
    users[username].rol = newRol;

    localStorage.setItem("users", JSON.stringify(users));
    renderUsersTable();
    editModal.classList.add("hidden");
  }
});

// Global functions for inline onclick handlers
window.deleteUser = function (username) {
  if (username === currentUserObj.usuario) {
    alert("No puedes eliminarte a ti mismo.");
    return;
  }
  if (confirm(`¿Seguro que quieres eliminar a ${username}?`)) {
    let users = JSON.parse(localStorage.getItem("users") || "{}");
    delete users[username];
    localStorage.setItem("users", JSON.stringify(users));
    renderUsersTable();
  }
};

// Remove old editUser function if it exists or just don't use it.
// We are using openEditModal now.

// Game Setup
startGameBtn.addEventListener("click", () => {
  const count = parseInt(ballCountInput.value);
  if (isNaN(count) || count < 15 || count > today) {
    setupMessageP.textContent = `Introduce un número entre 15 y ${today}.`;
    return;
  }
  startGame(count);
});

// Game Logic
function startGame(count) {
  gameSetup.classList.add("hidden");
  gameOver.classList.add("hidden");
  gameContainer.classList.remove("hidden");

  score = 0;
  scoreSpan.textContent = score;
  gameArea.innerHTML = "";
  balls = [];

  const types = ["red", "green", "yellow"];

  for (let i = 0; i < count; i++) {
    const type = types[Math.floor(Math.random() * types.length)];
    const ball = document.createElement("img");
    ball.src = `img/${type}.svg`;
    ball.className = "ball";
    ball.dataset.type = type;
    ball.draggable = false;

    // Random position
    const maxX = window.innerWidth - BALL_SIZE;
    const maxY = window.innerHeight - BALL_SIZE;
    let x = Math.random() * maxX;
    let y = Math.random() * maxY;

    // Random velocity
    let speedMultiplier = 1;
    if (type === "yellow") {
      speedMultiplier = 1.5; // Reduced speed
    }

    let dx = (Math.random() - 0.5) * 4 * speedMultiplier;
    let dy = (Math.random() - 0.5) * 4 * speedMultiplier;

    // Ensure non-zero speed
    if (Math.abs(dx) < 0.5)
      dx = 0.5 * speedMultiplier * (Math.random() < 0.5 ? -1 : 1);
    if (Math.abs(dy) < 0.5)
      dy = 0.5 * speedMultiplier * (Math.random() < 0.5 ? -1 : 1);

    ball.style.left = `${x}px`;
    ball.style.top = `${y}px`;

    ball.addEventListener("click", () => handleBallClick(ball, type));

    gameArea.appendChild(ball);

    balls.push({ element: ball, x, y, dx, dy });
  }

  if (gameInterval) cancelAnimationFrame(gameInterval);
  gameLoop();
}

function handleBallClick(ballElement, type) {
  let points = 10;
  if (type === "yellow") points = 20;

  score += points;
  scoreSpan.textContent = score;

  ballElement.remove();
  const ballIndex = balls.findIndex((b) => b.element === ballElement);
  if (ballIndex > -1) {
    balls.splice(ballIndex, 1);
  }

  if (balls.length === 0) {
    endGame();
  }
}

function gameLoop() {
  if (balls.length === 0) return;

  const maxX = window.innerWidth - BALL_SIZE;
  const maxY = window.innerHeight - BALL_SIZE;

  balls.forEach((ball) => {
    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.x <= 0 || ball.x >= maxX) ball.dx *= -1;
    if (ball.y <= 0 || ball.y >= maxY) ball.dy *= -1;

    if (ball.x < 0) ball.x = 0;
    if (ball.x > maxX) ball.x = maxX;
    if (ball.y < 0) ball.y = 0;
    if (ball.y > maxY) ball.y = maxY;

    ball.element.style.left = `${ball.x}px`;
    ball.element.style.top = `${ball.y}px`;
  });

  gameInterval = requestAnimationFrame(gameLoop);
}

function endGame() {
  cancelAnimationFrame(gameInterval);
  gameContainer.classList.add("hidden");
  gameOver.classList.remove("hidden");
  finalScoreSpan.textContent = score;

  if (currentUserObj) {
    currentUserObj.puntuacion = score;
    let users = JSON.parse(localStorage.getItem("users") || "{}");
    users[currentUserObj.usuario] = currentUserObj;
    localStorage.setItem("users", JSON.stringify(users));
  }
}

replayBtn.addEventListener("click", () => {
  showGameSetup();
});
