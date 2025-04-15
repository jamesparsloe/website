import Link from 'next/link'
import { format } from 'date-fns'
import { getPosts } from './utils'

export default async function Writing() {
    const posts = await getPosts()

    return (
        <div>
            {posts.map(post => (
                <div key={post.slug}>
                    <Link href={`/writing/${post.slug}`} className="hover:text-blue-400">
                        {post.title} - {format(new Date(post.date), "yyyy-MM-dd")}
                    </Link>
                </div>
            ))}
        </div>
    )
}