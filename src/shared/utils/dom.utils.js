const cache = {};

const getKey = (eventName, { query }) => {
  return `${eventName}-${query}`;
};

export const onDOMEvent = (event, { callback, query }) => {
  const handler = (ev) => {
    const target = ev.target;
    const matched = target.matches(query);

    if (!matched) {
      return;
    }

    callback(ev);
  };

  const cacheKey = getKey(event, { query });

  if (cache[cacheKey]) {
    removeDOMEvent(cacheKey);
  }

  cache[cacheKey] = {
    event,
    handler,
  };

  document.addEventListener(event, handler);

  return cacheKey;
};

export const removeDOMEvent = (cacheKey) => {
  let info = cache[cacheKey];

  if (!info) {
    return false;
  }

  document.removeEventListener(info.event, info.handler);
};

export const recordToStyle = (record) => {
  return Object.entries(record).reduce((res, [key, value]) => {
    const dashedKey = key.replace(/([A-Z])/g, "-$1").toLocaleLowerCase();

    return `${res}${dashedKey}: ${value};`;
  }, '');
};
