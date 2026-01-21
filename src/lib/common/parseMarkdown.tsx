import { type ReactNode } from "react";

/**
 * Simple markdown parser that converts basic markdown syntax to React elements.
 * Supports:
 * - *italic*, **bold**, __underline__, ~~strikethrough~~
 * - `inline code`
 * - ^superscript^, ~subscript~
 * - [links](url)
 * - \n for line breaks
 * - \* for escaped characters
 * - ```code blocks```
 * - > blockquotes
 * - * lists and 1. numbered lists
 */
export function parseMarkdown(text: string): ReactNode {
  if (!text) return text;

  // Handle block-level elements first
  const blocks = text.split(/\n\n+/);
  const blockElements: ReactNode[] = [];
  
  for (let blockIdx = 0; blockIdx < blocks.length; blockIdx++) {
    const block = blocks[blockIdx].trim();
    
    // Code block ```code```
    if (block.startsWith("```") && block.endsWith("```")) {
      const code = block.slice(3, -3).trim();
      blockElements.push(
        <pre key={blockIdx} style={{ padding: "1rem", borderRadius: "4px", overflow: "auto" }}>
          <code>{code}</code>
        </pre>
      );
      continue;
    }
    
    // Blockquote > text
    if (block.startsWith("> ")) {
      const quoteText = block.replace(/^> /gm, "");
      blockElements.push(
        <blockquote key={blockIdx} style={{ borderLeft: "4px solid #ccc", paddingLeft: "1rem", margin: "1rem 0", fontStyle: "italic" }}>
          {parseInline(quoteText)}
        </blockquote>
      );
      continue;
    }
    
    // Unordered list * item or - item
    if (/^[*-] /.test(block)) {
      const items = block.split("\n").filter(line => /^[*-] /.test(line));
      blockElements.push(
        <ul key={blockIdx} style={{ marginLeft: "1.5rem" }}>
          {items.map((item, i) => (
            <li key={i}>{parseInline(item.replace(/^[*-] /, ""))}</li>
          ))}
        </ul>
      );
      continue;
    }
    
    // Ordered list 1. item
    if (/^\d+\. /.test(block)) {
      const items = block.split("\n").filter(line => /^\d+\. /.test(line));
      blockElements.push(
        <ol key={blockIdx} style={{ marginLeft: "1.5rem" }}>
          {items.map((item, i) => (
            <li key={i}>{parseInline(item.replace(/^\d+\. /, ""))}</li>
          ))}
        </ol>
      );
      continue;
    }
    
    // Regular paragraph with inline parsing
    blockElements.push(<span key={blockIdx}>{parseInline(block)}</span>);
  }
  
  return blockElements.length > 0 ? <>{blockElements}</> : text;
}

function parseInline(text: string): ReactNode {
  if (!text) return text;

  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let key = 0;

  // Combined regex for all inline patterns
  // Order matters: longer patterns first to avoid partial matches
  const regex = /(```.+?```)|(\*\*(.+?)\*\*)|(__(.+?)__)|(~~(.+?)~~)|(`(.+?)`)|(\^(.+?)\^)|(~(.+?)~)|(\*(.+?)\*)|(\[([^\]]+)\]\(([^)]+)\))|(\\(.))/g;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    // Add text before the match, handling \n line breaks
    if (match.index > lastIndex) {
      const beforeText = text.slice(lastIndex, match.index);
      const lines = beforeText.split("\n");
      lines.forEach((line, i) => {
        if (i > 0) parts.push(<br key={`br-${key++}`} />);
        if (line) parts.push(line);
      });
    }

    if (match[2]) {
      // **bold**
      parts.push(<strong key={key++}>{parseInline(match[3])}</strong>);
    } else if (match[4]) {
      // __underline__
      parts.push(<u key={key++}>{parseInline(match[5])}</u>);
    } else if (match[6]) {
      // ~~strikethrough~~
      parts.push(<s key={key++}>{parseInline(match[7])}</s>);
    } else if (match[8]) {
      // `inline code`
      parts.push(<code key={key++} style={{ padding: "0.2rem 0.4rem", borderRadius: "3px", fontSize: "0.9em" }}>{match[9]}</code>);
    } else if (match[10]) {
      // ^superscript^
      parts.push(<sup key={key++}>{parseInline(match[11])}</sup>);
    } else if (match[12]) {
      // ~subscript~
      parts.push(<sub key={key++}>{parseInline(match[13])}</sub>);
    } else if (match[14]) {
      // *italic*
      parts.push(<em key={key++}>{parseInline(match[15])}</em>);
    } else if (match[16]) {
      // [text](url)
      parts.push(
        <a key={key++} href={match[18]} target="_blank" rel="noreferrer">
          {match[17]}
        </a>
      );
    } else if (match[19]) {
      // \* escaped character
      parts.push(match[20]);
    }

    lastIndex = regex.lastIndex;
  }

  // Add remaining text after last match, handling \n line breaks
  if (lastIndex < text.length) {
    const remainingText = text.slice(lastIndex);
    const lines = remainingText.split("\n");
    lines.forEach((line, i) => {
      if (i > 0) parts.push(<br key={`br-${key++}`} />);
      if (line) parts.push(line);
    });
  }

  return parts.length > 0 ? <>{parts}</> : text;
}
