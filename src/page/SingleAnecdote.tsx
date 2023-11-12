import { useParams } from 'react-router-dom'
import { Fragment, useEffect, useState } from 'react'
import agent from '../api/agent'
import ScrollContainer from 'react-indiana-drag-scroll'
import { IAnecdote } from '../model/anecdote'
import Anecdote from '../component/Anecdote'
import AnecdoteInfo from '../component/AnecdoteInfo'
import Comments from '../component/Comments'
import NotFound from '../component/NotFound'

type IParams = {
  slug: string
}

const SingleAnecdote: React.FC = () => {
	const { slug } = useParams<IParams>()
	const [anecdote, setAnecdote] = useState<IAnecdote>()
	const [anecdotes, setAnecdotes] = useState<IAnecdote[]>()
	const [error, setError] = useState(false)

	useEffect(() => {
		document.body.classList.add('single')
		agent.Anecdotes.selected(slug!).then((data) => {
			if (data.length) setAnecdote(data[0])
			else setError(true)
		})

		return () => {
			document.body.classList.remove('single')
		}
	}, [setAnecdote, slug])

	useEffect(() => {
		const loadNextFive = async (slugs: string[]) => {
			let nextFive: IAnecdote[] = []

			for (const slug of slugs) {
				const nextAnecdote = await agent.Anecdotes.selected(slug)
				nextFive = [...nextFive, nextAnecdote[0]]
			}

			return nextFive
		}

		if (anecdote) {
			document.title = anecdote.title.rendered + " - Türkiye'de Ağır Müziğin Geçmişi"
			loadNextFive(anecdote.next_five).then((data) => setAnecdotes(data))
		}
	}, [anecdote])

	if (error) return <NotFound type="olay" />

	return (
		<Fragment>
			<ScrollContainer className="main-section scroll-container" component={'section'} ignoreElements=".tamgModal, #respond form">
				{anecdote && <Anecdote anecdote={anecdote} />}
				{anecdote && <Comments anecdoteId={anecdote.id} />}
				{anecdote && anecdote.next_five.length ? <AnecdoteInfo id="anecdote-start"><p>Sonraki 5'li</p></AnecdoteInfo> : <Fragment />}
				{anecdotes && anecdotes.map((anecdote) => <Anecdote key={anecdote.slug} anecdote={anecdote} />)}
				{anecdotes && anecdotes.length ? <AnecdoteInfo id="anecdote-end"><p>Bu sıra bitti.</p></AnecdoteInfo> : <Fragment />}
			</ScrollContainer>
		</Fragment>
	)
}

export default SingleAnecdote