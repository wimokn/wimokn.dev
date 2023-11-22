export async function handle(input, output, hist) {
  let exec = input.split(" ");
  let cmd = exec[0];
  let args = exec.slice(1);

  if (!cmd) return;

  try {
    let handler = await import("./cmds/" + cmd + ".js");
    await handler.default(output, hist, ...args);
  } catch (e) {
    if (
      e.message.startsWith("error loading") ||
      e.message.startsWith("Failed to fetch")
    ) {
      output.innerHTML +=
        'command not found: <span class="error">' + input + "</span>";
    } else {
      output.innerHTML += '<span class="error">' + e + "</span>";
    }
  }
}
