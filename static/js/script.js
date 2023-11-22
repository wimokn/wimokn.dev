import { handle } from "./cmds.js";
import CFG from "./config.js";
import output from "./chatbot.js";

const terminal = document.getElementById("terminal");
let prompt = document.querySelector("#prompt-template").content.cloneNode(true);
const history = [];
let idx_history = 0;
let lastTab;

const sleep = (ms = 0) => new Promise((resolve) => setTimeout(resolve, ms));
loadTheme();
loadPre();

window.addEventListener("keyup", enterKey);
window.addEventListener("keydown", keyDown);
window.addEventListener("click", onClick);

async function keyDown(e) {
  if (e.key == "Escape") {
    e.preventDefault();

    let prompts = document.querySelectorAll("input");
    terminal.innerHTML += "";
    prompts = document.querySelectorAll("input");
    prompts[prompts.length - 1].focus();
    document.body.scrollTop = document.body.scrollHeight;
  }
  if (e.ctrlKey && e.key == "c") {
    e.preventDefault();

    let prompts = document.querySelectorAll("input");

    let command = prompts[prompts.length - 1];
    command.setAttribute("placeholder", command.value);
    command.setAttribute("readonly", true);
    terminal.innerHTML += "\n";

    prompt = document.querySelector("#prompt-template").content.cloneNode(true);
    terminal.appendChild(prompt);

    prompts = document.querySelectorAll("input");
    prompts[prompts.length - 1].focus();
    document.body.scrollTop = document.body.scrollHeight;
  }
  if (e.key === "Tab") {
    e.preventDefault();
    let now = new Date().getTime();
    let timesince = now - lastTab;
    if (timesince < 600 && timesince > 0) {
      showComplete(input.innerHTML.toLowerCase());
    } else {
      autoComplete();
    }
    lastTab = new Date().getTime();
  }
}

async function enterKey(e) {
  let prompts = document.querySelectorAll("input");
  let command = prompts[prompts.length - 1];
  if (e.key === "Enter") {
    command.setAttribute("placeholder", command.value);
    command.setAttribute("readonly", true);

    if (checkExistCMD(command.value.trim())) {
      if (command.value.includes("&&")) {
        let runs = command.value.split("&&");
        for (let cmds of runs) {
          await handle(cmds, terminal, history);
          terminal.innerHTML += "\n";
        }
      } else {
        await handle(command.value, terminal, history);
      }
      history.push(command.value);
      idx_history = history.length;
    }

    prompt = document.querySelector("#prompt-template").content.cloneNode(true);
    terminal.appendChild(prompt);

    prompts = document.querySelectorAll("input");
    prompts[prompts.length - 1].focus();
    document.body.scrollTop = document.body.scrollHeight;
  } else if (e.key == "ArrowUp" && idx_history != 0) {
    idx_history -= 1;
    command.value = history[idx_history];
  } else if (e.key == "ArrowDown" && idx_history != history.length) {
    idx_history += 1;
    if (history[idx_history] === undefined) {
      command.value = "";
    } else {
      command.value = history[idx_history];
    }
  }
}

function onClick(e) {
  let prompts = document.querySelectorAll("input");
  if (!window.getSelection().toString()) prompts[prompts.length - 1].focus();
}

function loadPre() {
  let banner = window.screen.width > 613 ? CFG.BANNER : CFG.BANNER_MIN;
  const prebanner = document.getElementById("banner");
  setTimeout(async () => {
    for (let i = 0; i < banner.length; i++) {
      prebanner.innerText += banner[i];
      await sleep(10);
    }
    await sleep(30);

    let a = navigator.userAgent;
    let os = a.slice(a.indexOf("(") + 1, a.indexOf(")"));
    const sys = os.substring(0, os.indexOf(";"));
    prompt = document.querySelector("#prompt-template").content;
    prompt.querySelector(".user").innerHTML =
      sys.toLowerCase() + '<span class="highlight">@</span>' + "wimokn.dev:~$";

    prompt = document.querySelector("#prompt-template").content.cloneNode(true);

    prebanner.innerText += "\nLast login: " + [new Date().toString()];
    terminal.appendChild(prompt);
  }, 300);
}

function showComplete(cmd) {
  let array = CFG.EXISTCMDS.filter((item) => item.startsWith(cmd));
  if (array.length > 1) {
    terminal.innerText += [array.join(", ")];
  }
}

function autoComplete() {
  let prompts = document.querySelectorAll("input");
  let command = prompts[prompts.length - 1];
  let arr = CFG.EXISTCMDS.filter((item) =>
    item.startsWith(command.value.toLowerCase())
  );
  if (arr.length === 1) {
    command.value = arr[0];
  }
}

function checkExistCMD(cmd) {
  if (CFG.EXISTCMDS.indexOf(cmd) > -1) {
    return true;
  } else if (!cmd) {
    return false;
  }
  let answers = output(cmd);
  if (answers) terminal.innerHTML += answers;
  else
    terminal.innerHTML +=
      'command not found: <span class="error">' + cmd + "</span>";
  return false;
}

function loadTheme() {
  const currentTheme = localStorage.getItem("theme") || "dark";
  document.body.dataset.theme = currentTheme;
}
