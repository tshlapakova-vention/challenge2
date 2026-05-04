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
    reviews: 0,
    activities: [
      { activity: "Opened Q1 design review session", category: "Public Speaking", date: "14-Jan-2026", points: 48 },
      { activity: "Keynoted internal UX summit", category: "Public Speaking", date: "03-Mar-2026", points: 56 },
      { activity: "Led monthly design guild presentation", category: "Public Speaking", date: "17-Dec-2025", points: 64 },
      { activity: "Presented prototype feedback to product team", category: "Public Speaking", date: "16-Dec-2025", points: 8 },
      { activity: "Hosted onboarding walkthrough for new designers", category: "Public Speaking", date: "15-Dec-2025", points: 16 },
      { activity: "Ran cross-team critique session", category: "Public Speaking", date: "18-Nov-2025", points: 16 },
      { activity: "Facilitated accessibility workshop", category: "Public Speaking", date: "12-Nov-2025", points: 32 },
      { activity: "Shared design system updates in all-hands", category: "Public Speaking", date: "26-Oct-2025", points: 16 },
      { activity: "Presented customer insights digest", category: "Public Speaking", date: "06-Oct-2025", points: 32 },
      { activity: "Presented sprint outcomes to leadership", category: "Public Speaking", date: "05-Oct-2025", points: 16 }
    ]
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
    reviews: 0,
    activities: [
      { activity: "Ran a live coding workshop for juniors", category: "Knowledge Sharing", date: "20-Feb-2026", points: 40 },
      { activity: "Explained frontend performance improvements", category: "Knowledge Sharing", date: "13-Dec-2025", points: 32 },
      { activity: "Presented reusable UI patterns", category: "Knowledge Sharing", date: "21-Nov-2025", points: 16 },
      { activity: "Hosted internal JavaScript Q&A", category: "Knowledge Sharing", date: "10-Nov-2025", points: 24 },
      { activity: "Shared test automation setup", category: "Knowledge Sharing", date: "31-Oct-2025", points: 16 }
    ]
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
    reviews: 7,
    activities: [
      { activity: "Presented quarterly analytics summary", category: "Reporting", date: "14-Dec-2025", points: 32 },
      { activity: "Walked through KPI dashboard changes", category: "Reporting", date: "29-Nov-2025", points: 16 },
      { activity: "Explained experiment outcomes", category: "Reporting", date: "08-Nov-2025", points: 24 },
      { activity: "Delivered data quality update", category: "Reporting", date: "22-Oct-2025", points: 16 }
    ]
  }
];

const state = {
  year: "all",
  quarter: "all",
  category: "all",
  query: "",
  expandedId: null
};

const yearFilter = document.getElementById("yearFilter");
const quarterFilter = document.getElementById("quarterFilter");
const categoryFilter = document.getElementById("categoryFilter");
const searchInput = document.getElementById("searchInput");
const rowsContainer = document.getElementById("rows");

function uniqueValues(key) {
  return [...new Set(employees.map((item) => item[key]))];
}

function uniqueActivityCategories() {
  return [...new Set(employees.flatMap((employee) => employee.activities.map((entry) => entry.category)))];
}

function uniqueActivityYears() {
  return [...new Set(
    employees.flatMap((employee) => employee.activities.map((entry) => entry.date.split("-").pop()))
  )].sort((a, b) => b - a);
}

function createMetricIcon(name, hint) {
  const icons = {
    monitor: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="12" rx="1.8"></rect><path d="M9 20h6"></path><path d="M12 16v4"></path></svg>',
    cap: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 9 12 4l10 5-10 5-10-5z"></path><path d="M6 11v4c0 1.8 3 3.2 6 3.2s6-1.4 6-3.2v-4"></path></svg>',
    mic: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="9" y="3" width="6" height="10" rx="3"></rect><path d="M7 10v1a5 5 0 0 0 10 0v-1"></path><path d="M12 16v4"></path><path d="M9 20h6"></path></svg>',
    megaphone: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 11h4l8-4v10l-8-4H3z"></path><path d="M8 15v4h2.5"></path><path d="M18 10a3 3 0 0 1 0 4"></path></svg>',
    book: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5h7a3 3 0 0 1 3 3v11H6a3 3 0 0 0-3 3z"></path><path d="M21 5h-7a3 3 0 0 0-3 3v11h7a3 3 0 0 1 3 3z"></path></svg>',
    bulb: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 10a4 4 0 1 1 8 0c0 1.8-.9 2.7-1.8 3.6-.8.8-1.2 1.4-1.2 2.4h-2c0-1-.4-1.6-1.2-2.4C8.9 12.7 8 11.8 8 10z"></path><path d="M10 19h4"></path><path d="M10.5 21h3"></path></svg>',
    bars: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20V9"></path><path d="M10 20V5"></path><path d="M16 20v-8"></path><path d="M22 20V3"></path></svg>',
    trend: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 16l5-5 4 4 7-7"></path><path d="M17 8h3v3"></path></svg>'
  };

  return `<span class="icon-svg hintable" data-hint="${hint}" aria-label="${hint}">${icons[name] || icons.monitor}</span>`;
}

function getMetricIcon(category) {
  if (category === "Public Speaking") {
    return createMetricIcon("mic", "Public Speaking");
  }

  if (category === "Knowledge Sharing") {
    return createMetricIcon("book", "Knowledge Sharing");
  }

  if (category === "Reporting") {
    return createMetricIcon("bars", "Reporting");
  }

  return createMetricIcon("monitor", "General");
}

function appendFilterOptions(select, values) {
  values.forEach((value) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    select.appendChild(option);
  });
}

appendFilterOptions(yearFilter, uniqueActivityYears());
appendFilterOptions(quarterFilter, uniqueValues("quarter"));
appendFilterOptions(categoryFilter, uniqueActivityCategories());

function getVisibleActivities(employee) {
  return employee.activities.filter((entry) => {
    const entryYear = entry.date.split("-").pop();
    if (state.year !== "all" && entryYear !== state.year) return false;
    if (state.category !== "all" && entry.category !== state.category) return false;
    return true;
  });
}

function getFilteredEmployees() {
  const q = state.query.trim().toLowerCase();

  return employees
    .filter((employee) => state.year === "all" || employee.activities.some((entry) => entry.date.split("-").pop() === state.year))
    .filter((employee) => state.quarter === "all" || employee.quarter === state.quarter)
    .filter((employee) => state.category === "all" || employee.activities.some((entry) => entry.category === state.category))
    .filter((employee) => {
      if (!q) {
        return true;
      }

      const fullName = `${employee.firstName} ${employee.lastName}`.toLowerCase();
      return fullName.includes(q) || employee.position.toLowerCase().includes(q);
    })
    .sort((a, b) => b.score - a.score);
}

function rowTemplate(employee, index) {
  const displayRank = index + 1;
  const isExpanded = state.expandedId === employee.id;
  const visibleActivities = getVisibleActivities(employee);
  const hasActivities = visibleActivities.length > 0;
  const categoryForIcons = visibleActivities[0]?.category || employee.activities[0]?.category;
  const metricIcon = hasActivities ? getMetricIcon(categoryForIcons) : "";
  const metricValue = employee.reviews + employee.commits;
  const activities = visibleActivities
    .map(
      (entry) => `
        <div class="activity-item">
          <div class="activity-name">${entry.activity}</div>
          <div class="activity-category"><span class="category-pill">${entry.category}</span></div>
          <div class="activity-date">${entry.date}</div>
          <div class="activity-points">+${entry.points}</div>
        </div>
      `
    )
    .join("");

  return `
    <article class="row ${isExpanded ? "is-expanded" : ""}" data-id="${employee.id}">
      <div class="row-top">
        <div class="rank-num">${displayRank}</div>
        <img class="row-avatar" src="${employee.avatar}" alt="Avatar of ${employee.firstName} ${employee.lastName}">
        <div class="row-main">
          <div class="name">${employee.firstName} ${employee.lastName}</div>
          <div class="role">${employee.position}</div>
        </div>
        <div class="metric">
          <span class="icon">${metricIcon}</span>
          <span class="value">${metricValue}</span>
        </div>
        <div class="total">
          <span class="lbl">TOTAL</span>
          <span class="points"><span class="star">★</span>${employee.score}</span>
        </div>
        <button class="chevron ${isExpanded ? "open" : ""}" type="button" aria-label="Toggle recent activity" aria-expanded="${isExpanded}" data-id="${employee.id}">
          <span class="chevron-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" focusable="false">
              <path d="M4 8l8 8 8-8"></path>
            </svg>
          </span>
        </button>
      </div>
      <div class="row-details ${isExpanded ? "is-open" : ""}">
        <div class="details-title">RECENT ACTIVITY</div>
        <div class="activity-head">
          <div>ACTIVITY</div>
          <div>CATEGORY</div>
          <div>DATE</div>
          <div>POINTS</div>
        </div>
        <div class="activity-list">
          ${activities || '<div class="activity-item"><div class="activity-name">No activity for selected category</div><div></div><div></div><div></div></div>'}
        </div>
      </div>
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

rowsContainer.addEventListener("click", (event) => {
  const toggleButton = event.target.closest(".chevron");
  if (!toggleButton) {
    return;
  }

  const employeeId = Number(toggleButton.dataset.id);
  state.expandedId = state.expandedId === employeeId ? null : employeeId;
  render();
});

render();
