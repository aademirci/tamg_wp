import { Fragment, useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../state/store'
import { loadAnecdotes, resetAnecdotes, setPage, startLoading } from '../state/anecdote/anecdoteSlice'
import Anecdote from "../component/Anecdote"
import ScrollContainer from "react-indiana-drag-scroll"
import agent from "../api/agent"
import AnecdoteNav from "../component/AnecdoteNav"
import AnecdoteInfo from "../component/AnecdoteInfo"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons"
import { useLocation } from "react-router-dom"
import { useInfinite } from "../hooks/useInfinite"
import Loading from "../component/Loading"

const Anecdotes: React.FC = () => {
	const [order, setOrder] = useState('desc')
	const [year, setYear] = useState(1)
	const [end, setEnd] = useState(false)
	const dispatch = useDispatch()
	const location = useLocation();
	const newLocation = useRef<string | undefined>("")
	const { anecdotes, loading, page } = useSelector((state: RootState) => state.anecdote)
	const infiniteScroll = useInfinite()

	useEffect(() => {
		document.title = "Olaylar - Türkiye'de Ağır Müziğin Geçmişi"
		document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#363430')

		const setup = () => {
			agent.AnecdotesHeaders.list(year).then((headerData) => {
				const maxPages = headerData['x-wp-totalpages']
				if (page <= maxPages) {
					dispatch(startLoading())
					agent.Anecdotes.listByYear(page, year, order).then((data) => dispatch(loadAnecdotes(data)))
				}
				if (page >= maxPages) setEnd(true)
			})
		}

		if (location.pathname === newLocation.current) {
            setup()
        } else {
            newLocation.current = location.pathname
			dispatch(resetAnecdotes())
            dispatch(setPage(1))
			setEnd(false)
            if ( page === 1 ) setup()
        }
			
	}, [dispatch, page, year, order, location])

	const callback = () => {
        dispatch(resetAnecdotes())
        dispatch(setPage(1))
    }

	return (
		<Fragment>
			{loading && <Loading />}
			<AnecdoteNav callback={callback} order={order} setOrder={setOrder} year={year} setYear={setYear} />
			<ScrollContainer className="main-section scroll-container" onEndScroll={infiniteScroll} component={'section'} ignoreElements=".tamgModal">
				<AnecdoteInfo id="anecdote-start">
					<p><FontAwesomeIcon icon={faInfoCircle} /></p>
					<p>Parmağınız veya fare imleciniz ile sağa-sola kaydırarak olaylar arasında geçiş yapabilirsiniz.</p>
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

export default Anecdotes