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
import { resetPerson, setAvatar, setPerson } from "../state/anecdote/taxonomySlice"
import { useInfinite } from "../hooks/useInfinite"
import { format } from "date-fns"
import { tr } from "date-fns/locale"
import { useDate } from "../hooks/useDate"
import parse from "html-react-parser"
import Loading from "../component/Loading"

type IParams = {
    slug: string
}

const Person: React.FC = () => {
    const [end, setEnd] = useState(false)
    const { slug } = useParams<IParams>()
    const dispatch = useDispatch()
    const newSlug = useRef<string | undefined>("")
    const birthDay = useDate()
    const { anecdotes, loading, page } = useSelector((state:RootState) => state.anecdote)
    const { person, avatar } = useSelector((state:RootState) => state.taxonomy)
    const infiniteScroll = useInfinite()

    useEffect(() => {
        const setup = () => {
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
            setup()
        } else {
            newSlug.current = slug
            dispatch(resetAnecdotes())
            dispatch(setPage(1))
            setEnd(false)
            if ( page === 1 ) setup()
        }

        return () => {
            dispatch(resetPerson())
        }
        
    }, [page, slug, dispatch])

    useEffect(() => {
        if (person) {
            document.title = person.name + " - Türkiye'de Ağır Müziğin Geçmişi"
            if (person.acf.avatar) agent.Media.getMedia(person.acf.avatar).then((data) => dispatch(setAvatar(data!)))
        }
    }, [person, dispatch])


    return (
        <Fragment>
			{loading && <Loading />}
			<AnecdoteNav />
			<ScrollContainer className="main-section scroll-container" onEndScroll={infiniteScroll} component={'section'} ignoreElements=".tamgModal">
				<div id="person" className="anecdote">
                   {avatar &&
                    <div className="main-image">
                        <img src={avatar?.media_details.sizes.medium.source_url} />
                    </div>
                    }
                    <div className="content">
                        <h1>{person?.name}</h1>
                        {person?.acf["dogum-tarihi"] && <p className="date">Doğum tarihi: {format(new Date(birthDay), 'd MMMM yyyy', {locale: tr})}</p>}
                        <p>{person?.description && parse(person?.description)}</p>
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