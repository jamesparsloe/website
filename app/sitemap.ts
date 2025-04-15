import { getPosts } from './utils';

export default async function sitemap() {
    const posts = await getPosts();
    
    const notes = posts.map((post) => ({
        url: `https://jamesparsloe.com/writing/${post.slug}`,
        lastModified: new Date(post.date).toISOString(),
    }));

    // Use the most recent post date for the homepage
    const mostRecentDate = posts.length > 0 
        ? new Date(posts[0].date).toISOString()  // posts are already sorted by date in getPosts()
        : new Date().toISOString();

    const routes = [''].map((route) => ({
        url: `https://jamesparsloe.com${route}`,
        lastModified: mostRecentDate,
    }));

    return [...routes, ...notes];
}