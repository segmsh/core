# @segmsh/core

Core types and utilities for the Segm.sh.

## Installation

```bash
npm install @segmsh/core
```

## Usage

### Implementing a Processor

Implement the `Processor` interface to create a custom processor.

```typescript
import { Processor, Document, id, root, segment } from "@segmsh/core";

interface MyParseOptions {
  preserveWhitespace?: boolean;
}

export class MyProcessor implements Processor<MyParseOptions> {
  parse(res: string, options?: MyParseOptions): Document {
    const segId = id({ text: "Hello World" });
    return {
      segments: [{ id: segId, text: "Hello World" }],
      tree: root([segment(segId)]),
    };
  }

  stringify(doc: Document): string {
    return doc.segments.map(s => s.text).join("\n");
  }
}
```

### ID Generation

Use `id()` to generate deterministic MD5-based segment IDs. Accepts a string key (for key-value formats) or segment content (for structured formats).

```typescript
import { id } from "@segmsh/core";

// Key-value formats (JSON, YAML)
const segId = id("button.submit");

// Structured formats (HTML, Markdown)
const segId = id({ text: "Hello World" });
const segId = id({ text: "Hello {b1}World{/b1}", tags: { b1: { class: "bold" } } });
const segId = id({ text: "Hello World", metadata: { section: "header" } });
```

### Tree Helpers

```typescript
import { root, element, segment, text } from "@segmsh/core";

const tree = root([
  element("p", segment("seg-1"), text("Hello")),
]);
```

## Development

```bash
npm install
npm run build
```

## License

[Apache 2.0](LICENSE)
