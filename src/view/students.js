import { STUDENTS } from "../main";

const getStudentElement = (student) => {
  const { id, eleph, obtained } = student;
  const studentInfo = STUDENTS.find((v) => v.id === id);
  if (!studentInfo) return `<li>error</li>`;

  return `<li class="student ${obtained ? "obtained" : ""}">
  <label>
    <input type="checkbox" ${obtained ? "checked" : ""} />
    <div class="student-name">${studentInfo.name} (${studentInfo.club})</div>
  </label>
  <div>
    <input
      type="text"
      value="${eleph}"
      pattern="^[1-9]{1}[0-9]*$"
      inputmode="numeric"
      aria-label="획득 엘레프 개수"
      placeholder="획득 엘레프 개수"
    />
    <span>/ 120</span>
  </div>
  <button>삭제</button>
</li>`;
};

export default (targetElement, { students }) => {
  const newStudentList = targetElement.cloneNode(true);
  const studentsElements = students.map(getStudentElement).join("");
  newStudentList.innerHTML = studentsElements;
  return newStudentList;
};
