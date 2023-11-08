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
import { resetBand, setAvatar, setBand } from "../state/anecdote/taxonomySlice"
import { useInfinite } from "../hooks/useInfinite"
import parse from "html-react-parser"
import Loading from "../component/Loading"

type IParams = {
    slug: string
}

const Band: React.FC = () => {
    const [end, setEnd] = useState(false)
    const { slug } = useParams<IParams>()
    const dispatch = useDispatch()
    const newSlug = useRef<string | undefined>("")
    const { anecdotes, loading, page } = useSelector((state:RootState) => state.anecdote)
    const { band, avatar } = useSelector((state:RootState) => state.taxonomy)
    const infiniteScroll = useInfinite()

    useEffect(() => {
        const setup = () => {
            agent.Taxonomies.findBand(slug!).then((data) => {
                dispatch(setBand(data[0]))
                agent.AnecdotesHeaders.listByBand(data[0].id).then((headerData) => {
                    const maxPages = headerData['x-wp-totalpages']
                    if (page <= maxPages) {
                        dispatch(startLoading())
                        agent.Anecdotes.listByBand(data[0].id, page).then((data) => dispatch(loadAnecdotes(data)))
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
            dispatch(resetBand())
        }
        
    }, [page, slug, dispatch])

    useEffect(() => {
        if (band) {
            document.title = band.name + " - Türkiye'de Ağır Müziğin Geçmişi"
            if (band.acf.avatar) agent.Media.getMedia(band.acf.avatar).then((data) => dispatch(setAvatar(data!)))
        }
    }, [band, dispatch])

    return (
        <Fragment>
			{loading && <Loading />}
			<AnecdoteNav />
			<ScrollContainer className="main-section scroll-container" onEndScroll={infiniteScroll} component={'section'} ignoreElements=".tamgModal">
                <div id="band" className="anecdote">
                    {avatar &&
                    <div className="main-image">
                        <img src={avatar?.media_details.sizes.medium.source_url} />
                    </div>
                    }
                    <div className="content">
                        <h1>{band?.name}</h1>
                        {band?.acf["kurulus-yili"] && <p className="date">Kuruluş yılı: {band.acf["kurulus-yili"]}</p>}
                        {band?.acf["yabanci-mi"] && <p className="country">Ülke: {band.acf.ulke}</p>}
                        <p>{band?.description && parse(band?.description)}</p>
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

export default Band