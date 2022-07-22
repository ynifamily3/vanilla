let template;

const createNewCustomConfirmNode = () => {
  if (!template) {
    template = document.getElementById("custom-confirm");
  }

  return template.content.firstElementChild.cloneNode(true);
};

export default (targetElement, { modal }) => {
  const { isOpen, title, description } = modal;
  const newCustomConfirm = targetElement.cloneNode(true);
  newCustomConfirm.innerHTML = "";
  newCustomConfirm.appendChild(createNewCustomConfirmNode());

  const $wrapper = newCustomConfirm.querySelector(".modal-wrapper");
  const $title = newCustomConfirm.querySelector(".modal-title");
  const $description = newCustomConfirm.querySelector(".modal-description");

  // 버튼에 이벤트 연결하기
  const $no = newCustomConfirm.querySelector(".no");
  const $yes = newCustomConfirm.querySelector(".yes");
  $no.addEventListener("click", () => {
    window.dispatchEvent(
      new CustomEvent("customModalResult", {
        detail: { answer: false },
      })
    );
  });
  $yes.addEventListener("click", () => {
    window.dispatchEvent(
      new CustomEvent("customModalResult", {
        detail: { answer: true },
      })
    );
  });

  if (isOpen) {
    $wrapper.classList.remove("hidden");
  } else {
    $wrapper.classList.add("hidden");
  }
  $title.textContent = title;
  $description.textContent = description;

  return newCustomConfirm;
};
