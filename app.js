const projects = [
  {
    title: "Portfolio Website",
    desc: "Modern portfolio design"
  },
  {
    title: "Food App",
    desc: "Responsive restaurant UI"
  },
  {
    title: "Classroom App",
    desc: "Interactive learning platform"
  }
];

const grid = document.getElementById("projectsGrid");

grid.innerHTML = projects.map(p => `
  <div class="project-card">
    <h3>${p.title}</h3>
    <p>${p.desc}</p>
  </div>
`).join("");