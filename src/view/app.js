let template;

const createAppElement = () => {
  if (!template) {
    template = document.getElementById("bluearchive-students-app");
  }
  return template.content.firstElementChild.cloneNode(true);
};

const addEvents = (targetElement, events) => {
  targetElement
    .querySelector(".new-student")
    .addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        events.addStudent(e.target.value);
        e.target.value = "";
      }
    });
};

export default (targetElement, state, events) => {
  const newApp = targetElement.cloneNode(true);
  newApp.innerHTML = "";
  newApp.appendChild(createAppElement());

  addEvents(newApp, events);

  return newApp;
};
