import studentsView from "./view/students.js";
import counterView from "./view/counter.js";
import filtersView from "./view/filters.js";
import applyDiff from "./applyDiff.js";
import registry from "./registry.js";

registry.add("students", studentsView);
registry.add("counter", counterView);
registry.add("filters", filtersView);

export const STUDENTS = [
  {
    id: 1,
    academy: "아비도스",
    dept: "아비도스 고등학교",
    club: "대책위원회",
    name: "시로코",
  },
  {
    id: 2,
    academy: "아비도스",
    dept: "아비도스 고등학교",
    club: "대책위원회",
    name: "호시노",
  },
  {
    id: 3,
    academy: "아비도스",
    dept: "아비도스 고등학교",
    club: "대책위원회",
    name: "세리카",
  },
  {
    id: 4,
    academy: "아비도스",
    dept: "아비도스 고등학교",
    club: "대책위원회",
    name: "노노미",
  },
  {
    id: 5,
    academy: "아비도스",
    dept: "아비도스 고등학교",
    club: "대책위원회",
    name: "아야네",
  },
  {
    id: 6,
    academy: "게헨나",
    dept: "게헨나 학원",
    club: "흥신소68",
    name: "아루",
  },
];

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

const render = () => {
  window.requestAnimationFrame(() => {
    const main = document.querySelector(".app");
    const newMain = registry.renderRoot(main, state);
    applyDiff(document.body, main, newMain);
  });
};

render();
