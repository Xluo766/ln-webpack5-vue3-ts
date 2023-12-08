let name = "sss";
export const sendName = () => {
  if (new Date().getSeconds() > 30) {
    name = "jjj";
  }
  return name;
};
