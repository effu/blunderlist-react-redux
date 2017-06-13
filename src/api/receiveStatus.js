export default (res) => {
  if (res.status >= 200 && res.status < 300) return Promise.resolve(res);
  return Promise.reject(res);
};
