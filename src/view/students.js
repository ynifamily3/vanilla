import { STUDENTS } from "../data.js";

let template;

const createNewStudentNode = () => {
  if (!template) {
    template = document.getElementById("student-item");
  }

  return template.content.firstElementChild.cloneNode(true);
};

const getStudentElement = (student, events) => {
  const { id, eleph, obtained } = student;
  const studentInfo = STUDENTS.find((v) => v.id === id);
  if (!studentInfo) return `<li>error</li>`;

  const element = createNewStudentNode();
  // querySelector 자체는 root가 잡히지 않고 자식만 잡힌다.
  const li = element; // element.querySelector(".student"); (not working)
  const checkbox = element.querySelector(".checkbox");
  const studentName = element.querySelector(".student-name");
  const elephInput = element.querySelector(".input");
  const deleteButton = element.querySelector(".delete");
  // deleteButton.textContent = `삭제 (${id})`;

  if (obtained) {
    li.classList.add("obtained");
    checkbox.checked = true;
  }
  studentName.textContent = `${studentInfo.name} (${studentInfo.club})`;
  elephInput.value = String(eleph);

  const handler = (e) => {
    console.log("삭제 핸들러 실행", id, studentInfo);
    events.deleteStudent(id);
  };

  deleteButton.addEventListener("click", handler);

  return element;
};

export default (targetElement, { students }, events) => {
  const newStudentList = targetElement.cloneNode(true);
  newStudentList.innerHTML = "";
  students
    .map((student) => getStudentElement(student, events))
    .forEach((element) => newStudentList.appendChild(element));
  return newStudentList;
};
