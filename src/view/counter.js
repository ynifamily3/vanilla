const getStudentCount = (students) => {
  const notObtained = students.filter((student) => !student.obtained);
  const { length } = notObtained;
  return String(length);
};

export default (targetElement, { students }) => {
  const newCounter = targetElement.cloneNode(true);
  newCounter.textContent = getStudentCount(students);
  return newCounter;
};
