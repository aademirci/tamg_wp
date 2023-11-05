import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { RootState } from "../state/store"
import { Fragment, useEffect, useRef } from "react"
import agent from "../api/agent"
import { loadAnecdotes, resetAnecdotes, setPage, startLoading } from "../state/anecdote/anecdoteSlice"
import AnecdoteNav from "../component/AnecdoteNav"
import ScrollContainer from "react-indiana-drag-scroll"
import AnecdoteInfo from "../component/AnecdoteInfo"
import Anecdote from "../component/Anecdote"
import { setBand } from "../state/anecdote/taxonomySlice"
import { useInfinite } from "../hooks/useInfinite"

type IParams = {
    slug: string
}

const Band: React.FC = () => {
    const { slug } = useParams<IParams>()
    const dispatch = useDispatch()
    const newSlug = useRef<string | undefined>("")
    const { anecdotes, loading, page } = useSelector((state:RootState) => state.anecdote)
    const { band } = useSelector((state:RootState) => state.taxonomy)
    const infiniteScroll = useInfinite()

    useEffect(() => {
        const setup = () => {
            console.log(page)
            agent.Taxonomies.findBand(slug!).then((data) => {
                dispatch(setBand(data[0]))
                agent.AnecdotesHeaders.listByBand(data[0].id).then((headerData) => {
                    const maxPages = headerData['x-wp-totalpages']
                    if (page <= maxPages) {
                        dispatch(startLoading())
                        agent.Anecdotes.listByBand(data[0].id, page).then((data) => dispatch(loadAnecdotes(data)))
                    }
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
                        <h1>{band?.name}</h1>
                        {band?.acf["kurulus-yili"] && <p>Kuruluş yılı: {band.acf["kurulus-yili"]}</p>}
                        <p>{band?.description}</p>
                    </div>
                </div>
				{anecdotes.map(anecdote => (
					<Anecdote key={anecdote.id} anecdote={anecdote} />
				))}
				<AnecdoteInfo id="anecdote-end">
					<p>Bu sıra bitti.</p>
				</AnecdoteInfo>
			</ScrollContainer>
		</Fragment>
    )
}

export default Band