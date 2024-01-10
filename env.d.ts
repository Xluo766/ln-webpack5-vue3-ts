declare module "*.jpg" {
  const src: string;
  export default src;
}

declare module "*.jpeg" {
  const src: string;
  export default src;
}

declare module "*.png" {
  const src: string;
  export default src;
}

declare module "*.gif" {
  const src: string;
  export default src;
}

declare module "*.svg" {
  const src: string;
  export default src;
}

declare module "*.css" {}
declare module "*.scss" {}
declare module "*.sass" {}

declare module "thread-loader/dist/index.js" {
  export function warmup(options: unknown, requires: unknown): void;
}
