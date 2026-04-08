import { md5 } from "js-md5";
import { Segment, Value } from "./types.js";

export { visit } from "unist-util-visit";
export { visitParents } from "unist-util-visit-parents";

function canonicalize(value: Value): Value {
  if (Array.isArray(value)) {
    return value.map(canonicalize);
  }

  if (value !== null && typeof value === "object") {
    return Object.keys(value)
      .sort()
      .reduce((acc, key) => {
        acc[key] = canonicalize((value as { [key: string]: Value })[key]);
        return acc;
      }, {} as { [key: string]: Value });
  }

  return value;
}

export function id(input: string | Omit<Segment, "id">): string {
  if (typeof input === "string") {
    return md5(input);
  }

  return md5(JSON.stringify(canonicalize(input as unknown as Value)));
}
