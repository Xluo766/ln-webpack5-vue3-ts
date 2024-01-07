let name = "sss";
export const sendName = (s: string) => {
  if (new Date().getSeconds() > 30) {
    name = "test" + s;
  }
  console.log(name);

  return name;
};

export function square(x: number) {
  return x * x;
}

export function cube(x: number) {
  return x * x * x;
}
