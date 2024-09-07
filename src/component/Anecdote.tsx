import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBuildingColumns, faComments } from "@fortawesome/free-solid-svg-icons"
import { IAnecdote } from "../model/anecdote"
import parse from "html-react-parser"
import { format } from "date-fns"
import { tr } from "date-fns/locale"
import { Fragment, useEffect, useState } from "react"
import agent from "../api/agent"
import { IMedia } from "../model/media"
import Attachment from "./Attachment"

const Anecdote: React.FC<{anecdote: IAnecdote}> = ({ anecdote }) => {
    const [media, setMedia] = useState<IMedia[]>([])
    const [commentsLength, setCommentsLength] = useState(0)
    const isMobile = navigator.userAgent.indexOf("iPhone") != -1
    const isSingle = document.body.classList.contains('single')

    useEffect(() => {
		agent.Media.getAttached(anecdote.id).then((data) => setMedia(data.reverse()))
        agent.Comments.list(anecdote.id).then(data => setCommentsLength(data.length))
    }, [anecdote])



    return (
        <div className="anecdote" id={anecdote?.slug} style={isMobile ? isSingle ? {height: 'calc(100vh - 170px)'} : {height: 'calc(100vh - 212px)'} : {}}>
            <div className="flexcontainer">
                <div className="main-image">
                    {anecdote.featured_media ? media.map(mid => {
                        if (mid.id === anecdote.featured_media){
                            return <Attachment key={mid.id} attachedMedia={mid} gallery={media} featured={true} />
                           } else {
                             return <Fragment key={mid.id}></Fragment>
                        }
                    }) : <div className="labelPush"></div>}
                    <div className="meta">
                        <h5 className="anecdote-type">
                            <span>
                                {anecdote['olaydaki_olay-tipleri'].map((type, index) => {
                                    return (
                                        <Link key={type.slug} to={`/olay-tipi/${type.slug}`}>
                                            {(index ? ', ' : '')}
                                            {type.name}
                                        </Link>
                                    )
                                })}
                            </span>
                        </h5>
                        <h5 className="anecdote-date">
                            <span>{format(new Date(anecdote!.date), 'd MMMM yyyy', {locale: tr})}</span>
                        </h5>
                    </div>
                </div>
                <div className="content">
                    <h2>
                        <Link to={`/olay/${anecdote?.slug}`} rel="bookmark" title={anecdote?.title.rendered}>{parse(anecdote!.title.rendered)}</Link>
                    </h2>
                    <div className="meta">
                        {anecdote.olaydaki_ortamlar &&
                            <span className="place">
                                <FontAwesomeIcon icon={faBuildingColumns} />
                                <Link to={`/ortam/${anecdote?.olaydaki_ortamlar[0].slug}`} rel="tag">{anecdote?.olaydaki_ortamlar[0].name}</Link>
                                {anecdote.olaydaki_sehirler &&
                                    <span>
                                        , <Link to={`/sehir/${anecdote?.olaydaki_sehirler[0].slug}`} rel="tag">{anecdote?.olaydaki_sehirler[0].name}</Link>
                                    </span>
                                }
                            </span>
                        }
                        
                        <div className="comment-count">
                            <FontAwesomeIcon icon={faComments} />
                            <Link to={`/olay/${anecdote?.slug}`}>{commentsLength} Yorum</Link>
                        </div>
                    </div>
                    {parse(anecdote!.content.rendered)}
                    <div className="newGallery">
                            {media.map(mid => {
                                if (mid.id !== anecdote.featured_media)
                                    return <Attachment key={mid.id} attachedMedia={mid} gallery={media} featured={false} />
                                else
                                    return <Fragment key={mid.id} />
                            })} 
                    </div>
                </div>
                <div className="witnesses">
                    <h6>Oradaydılar:</h6>
                    {anecdote?.olaydaki_gruplar && anecdote?.olaydaki_gruplar.map(band => (
                        <Link key={band.slug} to={`/grup/${band.slug}`} rel="tag">{parse(band.name)}</Link>
                    ))}
                    {anecdote?.olaydaki_kisiler && anecdote?.olaydaki_kisiler.map(person => (
                        <Link key={person.slug} to={`/kisi/${person.slug}`} rel="tag">{parse(person.name)}</Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Anecdote