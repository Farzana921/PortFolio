const projects = [
  {
    title: "Portfolio",
    image: "images/PortFolio.png",
    desc: "Responsive modern portfolio website"
  },
  {
    title: "Pocket Classroom",
    image: "images/pocket.png",
    desc: "Learning web app UI"
  },
  {
    title: "Foodie Hub",
    image: "images/foodia.png",
    desc: "Restaurant UI design"
  }
];

const grid = document.getElementById("projectsGrid");

grid.innerHTML = projects.map(p => `
  <div class="project-card">
    <img src="${p.image}">
    <div class="project-content">
      <h3>${p.title}</h3>
      <p>${p.desc}</p>
    </div>
  </div>
`).join("");