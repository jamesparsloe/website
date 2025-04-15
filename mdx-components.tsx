import type { MDXComponents } from "mdx/types"
import { Code } from "./app/components/code"
// import { MDXLayout } from "./app/components/mdx-layout"

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    Code,
  }
}
