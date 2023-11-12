import { SyntheticEvent, useState } from "react"
import agent from "../api/agent"
import { AxiosError } from "axios"
import { useDispatch } from "react-redux"
import { updateComments } from "../state/anecdote/commentSlice"

interface IProps {
    anecdoteId: number
}

const CommentForm: React.FC<IProps> = ({ anecdoteId }) => {
    const [comment, setComment] = useState('')
    const [author, setAuthor] = useState('')
    const [email, setEmail] = useState('')
    const [url, setUrl] = useState('')
    const [statusGood, setStatusGood] = useState(false)
    const [statusBad, setStatusBad] = useState(false)
    const [error, setError] = useState('')
    const dispatch = useDispatch()

    const handleSubmit = (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
        e.preventDefault()
        
        const data = JSON.stringify({
            post: anecdoteId,
            author_name: author,
            author_email: email,
            author_url: url,
            content: comment,
        })

        agent.Comments.post(data).then((data) => {
            if (data.status === 201) {
                setComment('')
                setAuthor('')
                setEmail('')
                setUrl('')
                setStatusBad(false)
                setStatusGood(true)
                dispatch(updateComments())
            }
        }).catch((error: AxiosError) => {
            setError(error.message)
            setStatusGood(false)
            setStatusBad(true)
        })

    }

    return (
        <div id="respond">
            <h2 id="reply-title" className="comment-reply-title">Yorum yap:</h2>
            <form onSubmit={handleSubmit}>
                <textarea name="comment" id="comment" rows={8} placeholder="Yorum alanı..." required value={comment} onChange={e => setComment(e.target.value)}></textarea>
                <input type="text" id="author" name="author" placeholder="İsim (Gerekli)" required value={author} onChange={e => setAuthor(e.target.value)} />
                <input type="email" id="email" name="email" placeholder="E-posta (Gerekli)" required value={email} onChange={e => setEmail(e.target.value)} />
                <input type="url" id="url" name="url" placeholder="Internet sitesi (https://)" value={url} onChange={e => setUrl(e.target.value)} />
                <p className="form-submit">
                    <input type="submit" value="Gönder" name="submit" id="submit" className="submit" />
                </p>
            </form>
            {statusGood && <p className="status-good">Yorumunuz başarıyla iletildi. Eğer bu ilk yorumunuzsa onay kuyruğunda bekliyor.</p>}
            {statusBad && <p className="status-bad">Bir hata oluştu. ({error})</p>}
        </div>
    )
}

export default CommentForm