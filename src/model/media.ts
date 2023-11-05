export interface IMedia {
    id: number
    link: string
    title: { rendered: string }
    description: { rendered: string }
    media_details: {
        sizes: {
            thumbnail: ISize
            medium: ISize
            full: ISize
        }
    }
}

export interface ISize {
    width: number
    source_url: string
}