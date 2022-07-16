export default (targetElement, { currentFilter }) => {
  const newFilter = targetElement.cloneNode(true);

  Array.from(newFilter.querySelectorAll("li a")).forEach((a) => {
    const href = a.href.split("#/")[1] || "all";
    if (href === `${currentFilter}`) {
      a.classList.add("selected");
    } else {
      a.classList.remove("selected");
    }
  });

  return newFilter;
};
