import React from "react"
import type { MDXComponents } from "mdx/types"
import { Code } from "./app/components/code"
import Link from "next/link";

// copied from https://github.com/tailwindlabs/tailwindcss.com/blob/main/src/mdx-components.tsx
function getTextContent(node: React.ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }

  if (React.isValidElement(node)) {
    if (node.type === "small") {
      return "";
    }

    // @ts-ignore
    return getTextContent(node.props.children);
  }

  if (Array.isArray(node)) {
    return node.map(getTextContent).join("");
  }

  return ""; // If the node is neither text nor a React element
}

function slugify(str: React.ReactNode) {
  return getTextContent(str)
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word characters except for -
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
}

function createHeading(level: 1 | 2 | 3 | 4 | 5 | 6) {
  return ({ children }: React.PropsWithChildren) => {
    let slug = slugify(children);
    return React.createElement(`h${level}`, { id: slug }, [
      React.createElement(
        "a",
        {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: "anchor",
        },
        children,
      ),
    ]);
  };
}


export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    h2: createHeading(2),
    h3: createHeading(3),
    h4: createHeading(4),
    h5: createHeading(5),
    h6: createHeading(6),

    a(props: any) {
      return <Link {...props} />;
    },
    Code,
  }
}
