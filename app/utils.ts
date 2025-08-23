import React from 'react'
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from "node:url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



export interface Post {
    slug: string
    title: string
    date: string
    draft: boolean
    topics: string[]
}

export async function getPosts() {
    const writingDir = path.join(process.cwd(), './writing')
    const directories = await fs.readdir(writingDir)

    const posts: Post[] = []

    const isProduction = process.env.NODE_ENV == "production"

    for (const dir of directories) {
        const stat = await fs.stat(path.join(writingDir, dir))

        if (!stat.isDirectory()) continue

        try {
            // const filePath = path.join(writingDir, dir, 'page.mdx')
            // const fileContent = await fs.readFile(filePath, 'utf8')
            // const { data } = matter(fileContent)
            const filePath = path.join(writingDir, dir, 'page.mdx')
            const slug = dir
            let module = await import(`../writing/${slug}/page.mdx`)
            const metadata = module.metadata

            if (isProduction && metadata.draft) continue

            posts.push({
                slug: dir,
                title: metadata.title || dir,
                date: metadata.date || '',
                draft: metadata.draft || false,
                topics: metadata.topics || []
            })
        } catch (e) {
            console.error(e)
            continue
        }
    }

    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}


export async function getPost(slug: string): Promise<{
    Component: React.FC,
    metadata: {
        title: string,
        description: string,
        date: string,
        draft: boolean,
        image?: string
    }
} | null> {

    if (!(await fs.stat(path.join(__dirname, `../writing/${slug}/page.mdx`)).catch(() => null))) {
        return null;
    }

    let module = await import(`../writing/${slug}/page.mdx`)

    return {
        Component: module.default,
        metadata: module.metadata
    }
}