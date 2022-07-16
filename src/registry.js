const registry = {};

const renderWrapper = (component) => {
  return (targetElement, state) => {
    // component: 뷰 함수를 대체함
    const element = component(targetElement, state);

    // 자식 컴포넌트까지 탐색한다.
    const childComponents = element.querySelectorAll("[data-component]");

    Array.from(childComponents).forEach((target) => {
      const name = target.dataset.component;
      const child = registry[name];
      if (!child) return;
      // 알맞는 레지스트리에서 찾은 컴포넌트로 대체한다.
      target.replaceWith(child(target, state));
    });

    return element;
  };
};

const add = (name, component) => {
  registry[name] = renderWrapper(component);
};

const renderRoot = (root, state) => {
  const cloneComponent = (root) => {
    return root.cloneNode(true);
  };

  return renderWrapper(cloneComponent)(root, state);
};

export default {
  add,
  renderRoot,
};
