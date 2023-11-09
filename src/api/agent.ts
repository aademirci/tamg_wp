import axios, { AxiosResponse } from "axios"
import { IAnecdote, ITaxonomy, IYears } from "../model/anecdote"
import { IMedia } from "../model/media"
import { IComment } from "../model/comment"

axios.defaults.baseURL = "https://turkiyedeagirmuzigingecmisi.com/wp-json/wp/v2/"

const responseBody = (response: AxiosResponse) => response.data
const responseHeader = (response: AxiosResponse) => response.headers

const requests = { 
    get: (url: string) => axios.get(url).then(responseBody),
    getHeaders: (url: string) => axios.get(url).then(responseHeader)

}

const Anecdotes = {
    listByYear: (page: number, year: number, order: string): Promise<IAnecdote[]> => {
        if (year === 1) return requests.get(`/olay?page=${page}&order=${order}`)
        else return requests.get(`/olay?page=${page}&before=${year}-12-31T23:59:59&after=${year}-01-01T00:00:00&order=${order}`)
    },
    listByBand: (id: number, page: number): Promise<IAnecdote[]> => requests.get(`/olay?gruplar=${id}&page=${page}`),
    listByPerson: (id: number, page: number): Promise<IAnecdote[]> => requests.get(`/olay?kisiler=${id}&page=${page}`),
    listByMedium: (id: number, page: number): Promise<IAnecdote[]> => requests.get(`/olay?ortamlar=${id}&page=${page}`),
    listByCity: (id: number, page: number): Promise<IAnecdote[]> => requests.get(`/olay?sehirler=${id}&page=${page}`),
    selected: (slug: string) => requests.get(`/olay?slug=${slug}`),
    getYears: (): Promise<IYears[]> => requests.get('/olay/archives')
}

const AnecdotesHeaders = {
    list: (year: number) => {
        if (year === 1) return requests.getHeaders('/olay')
        else return requests.getHeaders(`/olay?&before=${year}-12-31T23:59:59&after=${year}-01-01T00:00:00&order=asc`)
    },
    listByBand: (id: number) => requests.getHeaders(`/olay?gruplar=${id}`),
    listByPerson: (id: number) => requests.getHeaders(`/olay?kisiler=${id}`),
    listByMedium: (id: number) => requests.getHeaders(`/olay?ortamlar=${id}`),
    listByCity: (id: number) => requests.getHeaders(`/olay?sehirler=${id}`)
}

const Media = {
    getAttached: (id: number): Promise<IMedia[]> => requests.get(`/media?parent=${id}&per_page=100`),
    getMedia: (id: number): Promise<IMedia | undefined> => requests.get(`/media/${id}`)
}

const Taxonomies = {
    listBands: (): Promise<ITaxonomy[]> => requests.get('gruplar?order=desc&orderby=count&per_page=20'),
    listPersons: (): Promise<ITaxonomy[]> => requests.get('kisiler?order=desc&orderby=count&per_page=20'),
    findBand: (slug: string): Promise<ITaxonomy[]> => requests.get(`gruplar?slug=${slug}`),
    findPerson: (slug: string): Promise<ITaxonomy[]> => requests.get(`kisiler?slug=${slug}`),
    findMedium: (slug: string): Promise<ITaxonomy[]> => requests.get(`ortamlar?slug=${slug}`),
    findCity: (slug: string): Promise<ITaxonomy[]> => requests.get(`sehirler?slug=${slug}`)
}

const Comments = {
    list: (id: number): Promise<IComment[]> => requests.get(`/comments?post=${id}`)
}

export default { Anecdotes, AnecdotesHeaders, Media, Taxonomies, Comments }