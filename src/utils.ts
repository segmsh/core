import { md5 } from "js-md5";
import { Segment } from "./types.js";

export { visit } from "unist-util-visit";
export { visitParents } from "unist-util-visit-parents";

export function hash(msg: string): string {
  return md5(msg);
}

export function id({ text, tags, metadata }: Omit<Segment, "id">): string {
  return hash(JSON.stringify({ text, tags, metadata }));
}
