import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'

export interface Post {
    slug: string
    title: string
    date: string
    draft: boolean
    topics: string[]
}

export async function getPosts() {
    const writingDir = path.join(process.cwd(), 'app/writing')
    const directories = await fs.readdir(writingDir)

    const posts: Post[] = []

    const isProduction = process.env.NODE_ENV == "production"

    for (const dir of directories) {
        const stat = await fs.stat(path.join(writingDir, dir))

        if (!stat.isDirectory()) continue

        try {
            const filePath = path.join(writingDir, dir, 'page.mdx')
            const fileContent = await fs.readFile(filePath, 'utf8')
            const { data } = matter(fileContent)

            if (isProduction && data.draft) continue

            posts.push({
                slug: dir,
                title: data.title || dir,
                date: data.date || '',
                draft: data.draft || false,
                topics: data.topics || []
            })
        } catch (e) {
            continue
        }
    }

    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}