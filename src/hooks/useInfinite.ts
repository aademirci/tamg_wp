import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../state/store"
import { setPage } from "../state/anecdote/anecdoteSlice"

export const useInfinite = () => {
    const dispatch = useDispatch()
    const { anecdotes, page } = useSelector((state:RootState) => state.anecdote)

  const infiniteScroll = () => {
		if (anecdotes[0].slug) {
			const anecdoteWidth = document.getElementById(anecdotes[0].slug)!.offsetWidth + 20
			const screenSize = window.innerWidth - 40
			const windowWidth = anecdoteWidth * anecdotes.length
			const containerPosition = document.getElementsByClassName('main-section')[0].scrollLeft
			if (containerPosition + screenSize >= windowWidth - 40) dispatch(setPage(page + 1))
		}
	}

    return infiniteScroll
}