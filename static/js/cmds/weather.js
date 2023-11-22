export default async function (output) {
  let location = Intl.DateTimeFormat().resolvedOptions().timeZone;
  var locationarr = location.split("/");
  await fetch(`https://wttr.in/${locationarr[1]}?ATm`)
    .then((response) => {
      response.text().then((text) => {
        let array = text.split("\n");
        output.innerHTML += array;
      });
    })
    .catch(() => {
      output.innerHTML += "Network error when attempting to fetch data";
    });
}
