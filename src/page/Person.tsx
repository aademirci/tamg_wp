import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { RootState } from "../state/store"
import { Fragment, useEffect, useRef, useState } from "react"
import agent from "../api/agent"
import { loadAnecdotes, resetAnecdotes, setPage, startLoading } from "../state/anecdote/anecdoteSlice"
import AnecdoteNav from "../component/AnecdoteNav"
import ScrollContainer from "react-indiana-drag-scroll"
import AnecdoteInfo from "../component/AnecdoteInfo"
import Anecdote from "../component/Anecdote"
import { setPerson } from "../state/anecdote/taxonomySlice"
import { useInfinite } from "../hooks/useInfinite"

type IParams = {
    slug: string
}

const Person: React.FC = () => {
    const [end, setEnd] = useState(false)
    const { slug } = useParams<IParams>()
    const dispatch = useDispatch()
    const newSlug = useRef<string | undefined>("")
    const { anecdotes, loading, page } = useSelector((state:RootState) => state.anecdote)
    const { person } = useSelector((state:RootState) => state.taxonomy)
    const infiniteScroll = useInfinite()

    useEffect(() => {
        const setup = () => {
            console.log(page)
            agent.Taxonomies.findPerson(slug!).then((data) => {
                dispatch(setPerson(data[0]))
                agent.AnecdotesHeaders.listByPerson(data[0].id).then((headerData) => {
                    const maxPages = headerData['x-wp-totalpages']
                    if (page <= maxPages) {
                        dispatch(startLoading())
                        agent.Anecdotes.listByPerson(data[0].id, page).then((data) => dispatch(loadAnecdotes(data)))
                    }
                    if (page >= maxPages) setEnd(true)
                })
            })
        }
        
        if (slug === newSlug.current) {
            console.log('ora')
            setup()
        } else {
            newSlug.current = slug
            dispatch(resetAnecdotes())
            dispatch(setPage(1))
            console.log('bura')
            if ( page === 1 ) setup()
        }
        
    }, [page, slug, dispatch])

    return (
        <Fragment>
			{loading && <div className="loading">Hmmmm</div>}
			<AnecdoteNav />
			<ScrollContainer className="main-section scroll-container" onEndScroll={infiniteScroll} component={'section'} ignoreElements=".tamgModal">
				<div id="person" className="anecdote">
                    <div className="main-image"></div>
                    <div className="content">
                        <h1>{person?.name}</h1>
                        {person?.acf["dogum-tarihi"] && <p>Doğum tarihi: {person.acf["dogum-tarihi"]}</p>}
                        <p>{person?.description}</p>
                    </div>
                </div>
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

export default Person