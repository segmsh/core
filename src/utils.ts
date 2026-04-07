import { md5 } from "js-md5";
import { Segment } from "./types.js";

export { visit } from "unist-util-visit";
export { visitParents } from "unist-util-visit-parents";

export function id(input: string | Omit<Segment, "id">): string {
  return md5(typeof input === "string" ? input : JSON.stringify(input));
}
