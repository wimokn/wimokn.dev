export default async function (output, _hist, ...args) {
  if (args.length) {
    const name = args[0];
    output.innerHTML += "Opening Github...";
    window.open("https://github.com/wimokn/" + name);
  } else {
    let repositories;
    try {
      repositories = await fetch(
        "https://api.github.com/users/wimokn/repos?type=owner&sort=created"
      ).then((r) => r.json());
    } catch (e) {
      output.innerHTML += '<span class="error">' + e + "</span>";
      return;
    }

    const nonForkedRepositories = repositories
      .filter((repo) => !repo.fork)
      .slice(0, 10);

    const repositoriesInfo = nonForkedRepositories.map((repo) => ({
      name: repo.name,
      description: repo.description,
      link: repo.html_url,
      stars: repo.stargazers_count,
    }));

    repositoriesInfo.sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );

    output.innerHTML += "\n";

    repositoriesInfo.forEach((repo) => {
      output.innerHTML += `\<a href="${repo.link}">${repo.name}</a> ${repo.stars}|==>> ${repo.description}\n`;
    });

    output.innerHTML += `
<br>View More On My <span><a href="https://github.com/wimokn?tab=repositories">Github</a></span>\n
`;
  }
}
