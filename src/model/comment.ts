export interface IComment {
    id: number,
    post: number,
    author_name: string,
    author_url: string,
    date: string,
    content: { rendered: string },
    author_avatar_urls: { 96: string }
}