import { STUDENTS } from "./data.js";
import appView from "./view/app.js";
import studentsView from "./view/students.js";
import counterView from "./view/counter.js";
import filtersView from "./view/filters.js";
import customConfirmView from "./view/customConfirm.js";
import applyDiff from "./applyDiff.js";
import registry from "./registry.js";

registry.add("app", appView);
registry.add("students", studentsView);
registry.add("counter", counterView);
registry.add("filters", filtersView);
registry.add("custom-confirm", customConfirmView);

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
  modal: {
    isOpen: false,
    title: "{제목}",
    description: "{내용}",
  },
};

const events = {
  deleteStudent: (id) => {
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
  toggleStudent: (id) => {
    const student = state.students.find((item) => item.id === id);
    if (!student) return;
    student.obtained = !student.obtained;

    render();
  },
  changeEleph: (id, eleph) => {
    const student = state.students.find((item) => item.id === id);
    if (!student) return;
    student.eleph = eleph;
    // 포커스 잃어버리는 문제 -> 렌더링 엔진을 좀 더 정교하게 하면 해결됨. (attribute 만 바꾼다든지..)
    if (eleph >= 120) {
      student.obtained = true;
    }

    render();
  },
  showModal: async (title, description) => {
    state.modal.isOpen = true;
    state.modal.title = title;
    state.modal.description = description;

    render();

    return await new Promise((resolve) => {
      const handleModalControlEvent = (e) => {
        window.removeEventListener(
          "customModalResult",
          handleModalControlEvent
        );
        state.modal.isOpen = false;

        render();
        resolve(e.detail.answer);
      };
      window.addEventListener("customModalResult", handleModalControlEvent);
    });
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
