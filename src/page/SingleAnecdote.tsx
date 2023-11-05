import { useParams } from 'react-router-dom'
import { Fragment, useEffect, useState } from 'react'
import agent from '../api/agent'
import ScrollContainer from 'react-indiana-drag-scroll'
import { IAnecdote } from '../model/anecdote'
import Anecdote from '../component/Anecdote'

type IParams = {
  slug: string
}

const SingleAnecdote: React.FC = () => {
	const { slug } = useParams<IParams>()
	const [anecdote, setAnecdote] = useState<IAnecdote>()

	useEffect(() => {
		document.body.classList.add('single')
		agent.Anecdotes.selected(slug!).then((data) => setAnecdote(data[0]))

		return () => {
			document.body.classList.remove('single')
		}
	}, [setAnecdote, slug])

  return (
    <Fragment>
		<ScrollContainer className="main-section scroll-container" component={'section'} ignoreElements=".tamgModal">
			{anecdote && <Anecdote anecdote={anecdote} />}
		</ScrollContainer>
	</Fragment>
  )
}

export default SingleAnecdote