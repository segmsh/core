import { md5 } from "js-md5";
import { Tag } from "./types.js";

export { visit } from "unist-util-visit";
export { visitParents } from "unist-util-visit-parents";

export function hash(msg: string): string {
  return md5(msg);
}

export function id(
  text: string,
  tags?: { [key: string]: Tag },
  metadata?: { [key: string]: unknown },
): string {
  return hash(JSON.stringify({ text, tags, metadata }));
}
