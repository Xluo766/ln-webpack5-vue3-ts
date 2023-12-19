let name = "sss";
export const sendName = (s: string) => {
  if (new Date().getSeconds() > 30) {
    name = "test" + s;
  }
  console.log(name);

  return name;
};

sendName("");

import _ from "lodash/join";

console.log(_.join(["Another", "module", "loaded!"], " "));
