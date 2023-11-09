import { IComment } from "../model/comment"
import parse from "html-react-parser"
import { format } from "date-fns"
import { tr } from "date-fns/locale"

interface IProps {
    comment: IComment
}
const Comment: React.FC<IProps> = ({ comment }) => {
    return (
        <li id={`comment-${comment.id}`} className="comment">
            <article className="comment-body">
                <footer className="comment-meta">
                    <div className="comment-author vcard">
                        <img src={comment.author_avatar_urls[96]} className="avatar" />
                        <b className="fn">
                            {comment.author_url ? <a href={comment.author_url} rel="external nofollow ugc">{comment.author_name}</a> : comment.author_name}
                        </b>
                        <span className="says">dedi ki:</span>
                    </div>
                    <div className="comment-metadata">
                        {format(new Date(comment.date), 'd MMMM yyyy, H:mm', {locale: tr})}
                    </div>
                </footer>
                <div className="comment-content">
                    {parse(comment.content.rendered)}
                </div>
            </article>
        </li>
    )
}

export default Comment