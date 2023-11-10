import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../state/store"
import { Fragment, useEffect } from "react"
import agent from "../api/agent"
import { loadComments, loadModalComments, resetComments, startLoading } from "../state/anecdote/commentSlice"
import Loading from "./Loading"
import Comment from "./Comment"

interface IProps {
    anecdoteId: number
    isModal?: boolean
}

const Comments: React.FC<IProps> = ({ anecdoteId, isModal }) => {
    const dispatch = useDispatch()
    const { comments, modalComments, loading } = useSelector((state: RootState) => state.comment)
    const isMobile = navigator.userAgent.indexOf("iPhone") != -1

    useEffect(() => {
        const setup = () => {
            dispatch(startLoading())
            agent.Comments.list(anecdoteId).then((data) => {
                if (!isModal) dispatch(loadComments(data))
                else dispatch(loadModalComments(data))
            })
        }

        setup()
        
        return () => {
            if(!isModal) dispatch(resetComments())
        }
        
    }, [dispatch, anecdoteId, isModal])

    return (
        <Fragment>
            {loading && <Loading />}
            <section id="comments" className="anecdote" style={(isMobile && !isModal) ? {height: 'calc(100vh - 170px)'} : {}}>
                <h2 className="comments-title">
                    {isModal ? modalComments.length : comments.length} yorum var
                </h2>
                <ul className="comment-list">
                    {isModal ? 
                        modalComments.map(comment => (
                            <Comment key={comment.id} comment={comment} />
                        ))
                        :
                        comments.map(comment => (
                            <Comment key={comment.id} comment={comment} />
                        ))
                    }
                </ul>
            </section>
        </Fragment>
    )
}

export default Comments