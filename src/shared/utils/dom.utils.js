export const onDOMEvent = (event, { callback, query }) => {
  document.addEventListener(event, (ev) => {
    const target = ev.target;
    const matched = target.matches(query);

    if (!matched) {
      return;
    }

    callback(ev);
  });
};

export const removeDOMEvent = (eventName, handler) => {
  document.removeEventListener(eventName, handler);
};
