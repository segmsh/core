import { Root, Node } from "hast";

export type Value =
  | string
  | number
  | boolean
  | null
  | Value[]
  | { [key: string]: Value };

export interface SegmentRef extends Node {
  type: "segment";
  id: string;
}

// Key-value pairs of attributes for a tag marker within a segment (e.g., href, style)
export interface Tag {
  [k: string]: string;
}

// A single unit of text
export interface Segment {
  id: string;
  text: string;
  tags?: { [k: string]: Tag; };
  metadata?: { [k: string]: Value; };
}

// Document type with typed tree
export interface Document {
  tree: Root;
  segments: Segment[];
  metadata?: { [key: string]: Value };
}

export interface Processor<
  ParseOptions extends Record<string, unknown> = Record<string, unknown>,
  StringifyOptions extends Record<string, unknown> = Record<string, unknown>,
> {
  parse(res: string, options?: ParseOptions): Document;
  stringify(doc: Document, options?: StringifyOptions): string;
}

declare module "hast" {
  interface RootContentMap {
    segment: SegmentRef;
  }
  interface ElementContentMap {
    segment: SegmentRef;
  }
}
