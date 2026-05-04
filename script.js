const employees = [
  {
    id: 1,
    firstName: "Ethan",
    lastName: "Brooks",
    position: "Product Designer",
    avatar: "assets/avatar1.svg",
    year: "2026",
    quarter: "Q2",
    category: "Design",
    score: 536,
    commits: 17,
    reviews: 0
  },
  {
    id: 2,
    firstName: "Olivia",
    lastName: "Martinez",
    position: "Frontend Developer",
    avatar: "assets/avatar2.svg",
    year: "2026",
    quarter: "Q2",
    category: "Engineering",
    score: 328,
    commits: 10,
    reviews: 0
  },
  {
    id: 3,
    firstName: "Noah",
    lastName: "Bennett",
    position: "Data Analyst",
    avatar: "assets/avatar3.svg",
    year: "2026",
    quarter: "Q2",
    category: "Analytics",
    score: 320,
    commits: 1,
    reviews: 7
  }
];

const state = {
  year: "all",
  quarter: "all",
  category: "all",
  query: "",
  sortDirection: "desc"
};

const yearFilter = document.getElementById("yearFilter");
const quarterFilter = document.getElementById("quarterFilter");
const categoryFilter = document.getElementById("categoryFilter");
const searchInput = document.getElementById("searchInput");
const rowsContainer = document.getElementById("rows");
const sortTotalButton = document.getElementById("sortTotal");

function uniqueValues(key) {
  return [...new Set(employees.map((item) => item[key]))];
}

function appendFilterOptions(select, values) {
  values.forEach((value) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    select.appendChild(option);
  });
}

appendFilterOptions(yearFilter, uniqueValues("year"));
appendFilterOptions(quarterFilter, uniqueValues("quarter"));
appendFilterOptions(categoryFilter, uniqueValues("category"));

function getFilteredEmployees() {
  const q = state.query.trim().toLowerCase();

  return employees
    .filter((employee) => state.year === "all" || employee.year === state.year)
    .filter((employee) => state.quarter === "all" || employee.quarter === state.quarter)
    .filter((employee) => state.category === "all" || employee.category === state.category)
    .filter((employee) => {
      if (!q) {
        return true;
      }

      const fullName = `${employee.firstName} ${employee.lastName}`.toLowerCase();
      return fullName.includes(q) || employee.position.toLowerCase().includes(q);
    })
    .sort((a, b) => {
      const delta = b.score - a.score;
      return state.sortDirection === "desc" ? delta : -delta;
    });
}

function rowTemplate(employee, index) {
  const displayRank = index + 1;

  return `
    <article class="row" data-id="${employee.id}">
      <div class="rank-num">${displayRank}</div>
      <img class="row-avatar" src="${employee.avatar}" alt="Avatar of ${employee.firstName} ${employee.lastName}">
      <div class="row-main">
        <div class="name">${employee.firstName} ${employee.lastName}</div>
        <div class="role">${employee.position}</div>
      </div>
      <div class="metric">
        <span class="icon">&#128421;</span>
        <span class="value">${employee.reviews}</span>
      </div>
      <div class="metric">
        <span class="icon">&#128187;</span>
        <span class="value">${employee.commits}</span>
      </div>
      <div class="total">
        <span class="lbl">TOTAL</span>
        <span class="points"><span class="star">★</span>${employee.score}</span>
      </div>
      <div class="chevron">⌄</div>
    </article>
  `;
}

function updatePodium(sortedEmployees) {
  const first = sortedEmployees[0];
  const second = sortedEmployees[1];
  const third = sortedEmployees[2];

  const fillPodiumCard = (selector, employee) => {
    const card = document.querySelector(selector);
    if (!card) {
      return;
    }

    if (!employee) {
      card.style.visibility = "hidden";
      return;
    }

    card.style.visibility = "visible";
    card.querySelector(".avatar").src = employee.avatar;
    card.querySelector(".avatar").alt = `Avatar of ${employee.firstName} ${employee.lastName}`;
    card.querySelector(".person-name").textContent = `${employee.firstName} ${employee.lastName}`;
    card.querySelector(".person-role").textContent = employee.position;
    card.querySelector(".podium-points").textContent = employee.score;
  };

  fillPodiumCard("#podium-first", first);
  fillPodiumCard("#podium-second", second);
  fillPodiumCard("#podium-third", third);
}

function render() {
  const filtered = getFilteredEmployees();
  rowsContainer.innerHTML = filtered.map(rowTemplate).join("");
  updatePodium(filtered);
  sortTotalButton.querySelector(".arrow").textContent = state.sortDirection === "desc" ? "↓" : "↑";
}

yearFilter.addEventListener("change", (event) => {
  state.year = event.target.value;
  render();
});

quarterFilter.addEventListener("change", (event) => {
  state.quarter = event.target.value;
  render();
});

categoryFilter.addEventListener("change", (event) => {
  state.category = event.target.value;
  render();
});

searchInput.addEventListener("input", (event) => {
  state.query = event.target.value;
  render();
});

sortTotalButton.addEventListener("click", () => {
  state.sortDirection = state.sortDirection === "desc" ? "asc" : "desc";
  render();
});

render();
