export type * from "hast";

export * from "./types.js";
export * from "./utils.js";

import type { Root, Text, Node } from "hast";
import type { SegmentRef } from "./types.js";

export { h as element } from "hastscript";

export function root(children: Node[] = []): Root {
  return { type: "root", children } as Root;
}

export function segment(id: string): SegmentRef {
  return { type: "segment", id };
}

export function text(value: string = ""): Text {
  return { type: "text", value };
}
