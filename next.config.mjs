import createMDX from "@next/mdx"
import { remarkCodeHike, recmaCodeHike } from "codehike/mdx"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"
import remarkGfm from "remark-gfm"




/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions`` to include MDX files
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  // Optionally, add any other Next.js config below
}

/** @type {import('codehike/mdx').CodeHikeConfig} */
const chConfig = {
  components: { code: "Code" },
}

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [
      [remarkCodeHike, chConfig],
      remarkMath,
      remarkGfm,
    ],
    recmaPlugins: [[recmaCodeHike, chConfig]],
    rehypePlugins: [rehypeKatex],
    jsx: true,
  },
})

// Merge MDX config with Next.js config
export default withMDX(nextConfig)
