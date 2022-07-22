import { STUDENTS } from "../data.js";

let template;

const createNewStudentNode = () => {
  if (!template) {
    template = document.getElementById("student-item");
  }

  return template.content.firstElementChild.cloneNode(true);
};

const getStudentElement = (student, events) => {
  const { id, eleph, obtained, image } = student;
  const studentInfo = STUDENTS.find((v) => v.id === id);
  if (!studentInfo) return `<li>error</li>`;

  const element = createNewStudentNode();
  // querySelector 자체는 root가 잡히지 않고 자식만 잡힌다.
  const li = element; // element.querySelector(".student"); (not working)
  const checkbox = element.querySelector(".checkbox");
  const img = element.querySelector(".student-image");
  const studentName = element.querySelector(".student-name");
  const elephInput = element.querySelector(".input");
  const deleteButton = element.querySelector(".delete");

  img.src = studentInfo.image;

  // 렌더링 최적화로 인해, 이벤트 리스너가 다름에도 불구하고 같은 DOM으로 인식하는 버그가 있었음.
  // 해결: deleteButton에 추적용 ID를 달아 놓는다. 이것은 새로 렌더링 되어야만 한다!
  deleteButton.dataset["student_id"] = id;
  checkbox.dataset["student_id"] = id;
  elephInput.dataset["student_id"] = id;

  if (obtained) {
    li.classList.add("obtained");
    checkbox.checked = true;
  }
  studentName.textContent = `${studentInfo.name} (${studentInfo.club})`;
  elephInput.value = String(eleph);

  return element;
};

export default (targetElement, state, events) => {
  const { students } = state;
  const { deleteStudent, toggleStudent, showModal } = events;
  const newStudentList = targetElement.cloneNode(true);
  newStudentList.innerHTML = "";
  students
    .map((student) => getStudentElement(student, events))
    .forEach((element) => newStudentList.appendChild(element));

  newStudentList.addEventListener("click", async (e) => {
    if (e.target.matches("button.delete")) {
      const currentStudentId = Number(e.target.dataset.student_id);
      const targetStudent = STUDENTS.find(
        (item) => item.id === currentStudentId
      );
      const result = await showModal(
        "잠깐만!",
        `정말로 ${targetStudent.name} 학생을 리스트에서 삭제하시겠습니까?`
      );
      if (result === true) deleteStudent(Number(e.target.dataset.student_id));
    }
  });

  newStudentList.addEventListener("change", (e) => {
    if (e.target.matches("input.checkbox")) {
      toggleStudent(Number(e.target.dataset.student_id));
    }
  });

  newStudentList.addEventListener("input", (e) => {
    if (e.target.matches("input.input")) {
      const eleph = Number(e.target.value);
      console.log("엘", eleph);
      if (isNaN(eleph)) return;
      events.changeEleph(Number(e.target.dataset.student_id), eleph);
    }
  });

  return newStudentList;
};
