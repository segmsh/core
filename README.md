# Segm.sh Core



## Features

- **Abstract Processor**: A base class for creating custom processors that work seamlessly with the Localize.sh CLI (Node.js) and in browser environments.
- **ID Generation**: Built-in `id()` method for generating deterministic MD5-based segment IDs.
- **Type Definitions**: Comprehensive TypeScript definitions for Documents, Segments, and Layouts (HAST compatible).

## Installation

```bash
npm install @segmsh/core
```

## Usage

### Creating a Processor

Extend the `Processor` abstract class to implement your custom localization logic. This works for both CLI tools and browser-based processors.

```typescript
import { Processor, Document, root, segment } from "@segmsh/core";

interface MyParseOptions {
  preserveWhitespace?: boolean;
}

export class MyCustomProcessor extends Processor<MyParseOptions> {
  // Parse a source file (e.g., Markdown, JSON) into a Segm Document
  parse(res: string, options?: MyParseOptions): Document {
    const id = this.id("Hello World");
    return {
      segments: [{ id, text: "Hello World" }],
      layout: root([segment(id)])
    };
  }

  // Convert a Segm Document back into the source format
  stringify(doc: Document): string {
    return doc.segments.map(s => s.text).join("\n");
  }
}
```

### ID Generation

The `Processor` base class provides a built-in `id()` method for generating deterministic segment IDs based on text, tags, and metadata.

```typescript
const id = this.id("Hello {b1}World{/b1}", { b1: { class: "bold" } });
const idWithMeta = this.id("Hello World", undefined, { section: "header" });
```

## Development

1.  **Install dependencies**:
    ```bash
    npm install
    ```

2.  **Generate schema types**:
    ```bash
    npm run schema
    ```

3.  **Build the SDK**:
    ```bash
    npm run build
    ```

4.  **Run Tests**:
    ```bash
    npm test
    ```

## License

[Apache 2.0](LICENSE)
