export default function (output, history) {
  history.forEach((cmd, index) => {
    output.innerHTML += index + 1 + "  " + cmd + "<br>";
  });
}
