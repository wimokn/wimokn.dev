const sleep = (ms = 0) => new Promise((resolve) => setTimeout(resolve, ms));
loadError();

const err = document.title;

function loadError() {
  setTimeout(async () => {
    var terminal = document.getElementById("terminal");
    if (terminal != null) {
      for (let i = 0; i < err.length; i++) {
        terminal.innerHTML += '<span class="error">' + err[i] + "</span>";
        await sleep(10);
      }
    }
  }, 500);
}
