import { STUDENTS } from "./data.js";
import appView from "./view/app.js";
import studentsView from "./view/students.js";
import counterView from "./view/counter.js";
import filtersView from "./view/filters.js";
import applyDiff from "./applyDiff.js";
import registry from "./registry.js";

registry.add("app", appView);
registry.add("students", studentsView);
registry.add("counter", counterView);
registry.add("filters", filtersView);

const state = {
  students: [
    { id: 1, eleph: 10, obtained: true },
    { id: 2, eleph: 20, obtained: true },
    { id: 3, eleph: 30, obtained: false },
    { id: 4, eleph: 40, obtained: false },
    { id: 5, eleph: 50, obtained: true },
    { id: 6, eleph: 77, obtained: true },
  ],
  currentFilter: "all", // all, not-recruited, recruited
};

const events = {
  deleteStudent: (id) => {
    console.log("학생 삭제:", id);
    const idx = state.students.findIndex((item) => item.id === id);
    if (idx === -1) return;
    state.students.splice(idx, 1);

    render();
  },
  addStudent: (name) => {
    const db = STUDENTS.find((item) => item.name === name);
    if (!db) return;
    if (state.students.find((student) => student.id === db.id)) return;
    state.students.push({
      id: db.id,
      eleph: 0,
      obtained: false,
    });

    render();
  },
};

const render = () => {
  window.requestAnimationFrame(() => {
    const main = document.querySelector("#root");
    const newMain = registry.renderRoot(main, state, events);
    applyDiff(document.body, main, newMain);
  });
};

render();
