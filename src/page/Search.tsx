import { Fragment, useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import agent from "../api/agent"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../state/store"
import { loadAnecdotes, resetAnecdotes, setPage, startLoading, stopLoading } from "../state/anecdote/anecdoteSlice"
import Loading from "../component/Loading"
import AnecdoteNav from "../component/AnecdoteNav"
import ScrollContainer from "react-indiana-drag-scroll"
import { useInfinite } from "../hooks/useInfinite"
import AnecdoteInfo from "../component/AnecdoteInfo"
import Anecdote from "../component/Anecdote"

type IParams = {
    search: string
}

const Search: React.FC = () => {
    const [end, setEnd] = useState(false)
    const { search } = useParams<IParams>()
    const dispatch = useDispatch()
    const newSearch = useRef<string | undefined>("")
    const { anecdotes, loading, page } = useSelector((state: RootState) => state.anecdote)
    const infiniteScroll = useInfinite()

    useEffect(() => {
        document.title = "Arama sonuçları - Türkiye'de Ağır Müziğin Geçmişi"
        const setup = () => {
            agent.AnecdotesHeaders.search(search!).then(headerdata => {
                if (headerdata['x-wp-total'] !== "0") {
                    const maxPages = headerdata['x-wp-totalpages']
                    if (page <= maxPages) {
                        dispatch(startLoading())
                        agent.Anecdotes.search(search!, page).then(data => dispatch(loadAnecdotes(data)))
                    }
                    if (page >= maxPages) setEnd(true)
                } else {
                    dispatch(stopLoading())
                }
            })
        }

        if (search === newSearch.current) {
            setup()
        } else {
            newSearch.current = search
			dispatch(resetAnecdotes())
            dispatch(setPage(1))
			setEnd(false)
            if ( page === 1 ) setup()
        }

    }, [search, page, dispatch])

    return (
        <Fragment>
            {loading && <Loading />}
            <AnecdoteNav />
            <ScrollContainer className="main-section scroll-container" onEndScroll={infiniteScroll} component={'section'} ignoreElements=".tamgModal">
                <AnecdoteInfo id="anecdote-start">
					<p>Aranan terim: {search}</p>
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

export default Search