// THEMES: ["atday", "atnight", "belafonteday", "gruvboxdark"],

// THEME: [
//   "Usage: theme [arg]",
//   "Args:",
//   "  - ls: list all available themes",
//   "  - set: set a theme",
//   "  - set random: set a random theme",
//   "<br>",
//   "Example:",
//   "  theme ls # to list all available themes",
//   "  theme set atday # to set a theme",
// ],

function switchTheme(cmd) {
  let themeTxt = cmd.slice(10);
  if (themeTxt === "random") {
    themeTxt = randomTheme();
  }
  if (themes.includes(themeTxt)) {
    setTheme(themeTxt);
    return;
  }
  terminal.innerText += [
    `Theme '${themeTxt}' not found. Try 'theme ls' to see the list of available themes.`,
  ];
}

function randomTheme() {
  var randomNumber = Math.floor(Math.random() * themes.length);
  return themes[randomNumber];
}

function setTheme(theme) {
  //document.body.dataset.theme = theme;
  //localStorage.setItem("theme", theme);
}

export default async function (output, _hist, ...args) {
  if (args.length) {
    const cmd = args[0];
    switch (cmd) {
      case "ls":
        output.innerHTML += [CFG.THEME];
        break;
      case cmd.startsWith("set") ? cmd : "":
        switchTheme(cmd);

      default:
        output.innerHTML +=
          "Command not found. For a list of commands, type 'help'";
        break;
    }
  } else {
    output.innerHTML += [CFG.THEME];
  }
}
