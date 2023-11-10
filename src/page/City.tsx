import { Fragment, useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { RootState } from "../state/store"
import { useInfinite } from "../hooks/useInfinite"
import { resetTaxonomy, setCity } from "../state/anecdote/taxonomySlice"
import agent from "../api/agent"
import { loadAnecdotes, resetAnecdotes, setPage, startLoading } from "../state/anecdote/anecdoteSlice"
import Loading from "../component/Loading"
import AnecdoteNav from "../component/AnecdoteNav"
import ScrollContainer from "react-indiana-drag-scroll"
import AnecdoteInfo from "../component/AnecdoteInfo"
import Anecdote from "../component/Anecdote"
import parse from "html-react-parser"

type IParams = {
    slug: string
}

const City: React.FC = () => {
    const [end, setEnd] = useState(false)
    const { slug } = useParams<IParams>()
    const dispatch = useDispatch()
    const newSlug = useRef<string | undefined>("")
    const { anecdotes, loading, page } = useSelector((state:RootState) => state.anecdote)
    const { city } = useSelector((state:RootState) => state.taxonomy)
    const infiniteScroll = useInfinite()

    useEffect(() => {
        const setup = () => {
            agent.Taxonomies.findCity(slug!).then((data) => {
                dispatch(setCity(data[0]))
                agent.AnecdotesHeaders.listByCity(data[0].id).then((headerData) => {
                    const maxPages = headerData['x-wp-totalpages']
                    if (page <= maxPages) {
                        dispatch(startLoading())
                        agent.Anecdotes.listByCity(data[0].id, page).then((data) => dispatch(loadAnecdotes(data)))
                    }
                    if (page >= maxPages) setEnd(true)
                })
            })
		}

        if (slug === newSlug.current) {
            setup()
        } else {
            newSlug.current = slug
            dispatch(resetAnecdotes())
            dispatch(setPage(1))
            setEnd(false)
            if ( page === 1 ) setup()
        }

        return () => {
            dispatch(resetTaxonomy())
        }
    }, [page, slug, dispatch])
    
    return (
        <Fragment>
            {loading && <Loading />}
            <AnecdoteNav />
            <ScrollContainer className="main-section scroll-container" onEndScroll={infiniteScroll} component={'section'} ignoreElements=".tamgModal">
                <AnecdoteInfo id="anecdote-start">
                    <h1>{city && city.name}</h1>
					<p className="description">{city && parse(city.description)}</p>
				</AnecdoteInfo>
                {anecdotes.map(anecdote => (
					<Anecdote key={anecdote.id} anecdote={anecdote} />
				))}
				{end &&
				<AnecdoteInfo id="anecdote-end">
					<p>Bu sıra bitti.</p>
				</AnecdoteInfo>
                }
            </ScrollContainer>
        </Fragment>
    )
}

export default City