export const log = (type, ...props) => {
  const canLog = window.process?.env === 'develop';

  if (!canLog) {
    return;
  }

  const callback = console[type] || console.info;

  if (callback) {
    callback(...props);
  }
};