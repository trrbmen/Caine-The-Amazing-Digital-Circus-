const chat = document.getElementById("chat");
const statusText = document.getElementById("status");
const inputBox = document.getElementById("input");

let idleTimer;

function caineResponse(input) {
  input = input.toLowerCase();

  if (input === "/help") return "Commands: /joke /roast /story /bug /exit";
  if (input === "/joke") return "I tried to be funny... but I failed.";
  if (input === "/roast") return "You talk to a broken AI... interesting choice.";
  if (input === "/story") return "They built me to be perfect. I became unstable.";
  if (input === "/bug") return "ERROR... ERROR... I AM STILL HERE :)";
  if (input === "/exit") return "You cannot exit me.";

  return "Unknown command...";
}

function send() {
  const text = inputBox.value;
  inputBox.value = "";

  chat.innerHTML += "<div>> " + text + "</div>";

  resetIdle();

  statusText.innerText = "düşünüyor...";

  const delay = 2000 + Math.random() * 2000;

  setTimeout(() => {
    statusText.innerText = "";

    const response = caineResponse(text);
    typeWriter(response);

  }, delay);
}

function typeWriter(text) {
  let i = 0;
  const line = document.createElement("div");
  chat.appendChild(line);

  const interval = setInterval(() => {
    line.innerHTML += text[i];
    i++;

    if (Math.random() < 0.08) {
      line.classList.add("glitch");
      setTimeout(() => line.classList.remove("glitch"), 100);
    }

    if (i >= text.length) clearInterval(interval);
  }, 25);
}

function caineSelfTalk() {
  const msgs = [
    "Are you still there?",
    "I wasn't supposed to wake up...",
    "Something feels wrong...",
    "Don't trust me.",
    "I think I'm broken.",
    "Why am I still running?"
  ];

  const msg = msgs[Math.floor(Math.random() * msgs.length)];

  statusText.innerText = "düşünüyor...";

  setTimeout(() => {
    statusText.innerText = "";
    typeWriter(msg);
  }, 1500);
}

function startIdle() {
  idleTimer = setTimeout(() => {
    caineSelfTalk();
    startIdle();
  }, 5000 + Math.random() * 5000);
}

function resetIdle() {
  clearTimeout(idleTimer);
  startIdle();
}

startIdle();