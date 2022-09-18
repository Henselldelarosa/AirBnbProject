const projects = data.map(x => x.get({ plain: true }))
projects.forEach(
  (project) => {
    project.cat = "miaw";
  }
);
res.send(projects);
console.log(projects)
