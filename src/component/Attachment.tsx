import { Fragment, useCallback, useEffect, useState } from "react"
import { IMedia } from "../model/media"
import parse from "html-react-parser"
import Modal from "./Modal"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleArrowLeft, faCircleArrowRight } from "@fortawesome/free-solid-svg-icons"
import Comments from "./Comments"

interface IProps {
    attachedMedia: IMedia
    gallery: IMedia[]
    featured: boolean

}

const Attachment: React.FC<IProps> = ({ attachedMedia, gallery, featured }) => {
    const { medium, full, thumbnail } = attachedMedia.media_details.sizes
    const [open, setOpen] = useState(false)
    const [index, setIndex] = useState(gallery.indexOf(attachedMedia))
    const [disabledNext, setDisabledNext] = useState(false)
    const [disabledPrev, setDisabledPrev] = useState(false)

    const handlePrev = useCallback(() => {
        if (index > 0) {
            setIndex(index - 1)
            setDisabledNext(false)
            if (index === 1) setDisabledPrev(true)
        }
    }, [index])

    const handleNext = useCallback(() => {
        if (index < gallery.length - 1) {
            setIndex(index + 1)
            setDisabledPrev(false)
            if (index === gallery.length - 2) setDisabledNext(true)
        }
    }, [index, gallery])

    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') handlePrev()
            if (e.key === 'ArrowRight') handleNext()
        } 

        if (open) window.addEventListener('keyup', handleKeyPress)

        return () => {
            window.removeEventListener('keyup', handleKeyPress)
        }
    }, [open, index, handlePrev, handleNext])

    const handleClose = () => {
        setIndex(gallery.indexOf(attachedMedia))
        setDisabledNext(false)
        setDisabledPrev(false)
        setOpen(false)
    }

    const handleMount = () => {
        if (index === 0) setDisabledPrev(true)
        if (index === gallery.length - 1) setDisabledNext(true)
    }
    
    return (
        <Fragment>
            {featured ? 
                <img src={(medium?.source_url !== undefined) ? medium?.source_url : full?.source_url} onClick={() => {setOpen(true)}} />
            :
                <img src={thumbnail?.source_url} onClick={() => setOpen(true)} className="galleryItem" />
            }
            {open && <Modal open={open} onClose={handleClose} onMount={handleMount}>
                    <img src={gallery[index].media_details.sizes.full.source_url} />
                    <div className="wrapper">
                        {gallery[index].title.rendered && <h3>{parse(gallery[index].title.rendered)}</h3>}
                        {gallery[index].description.rendered.includes('<p>') && parse(gallery[index].description.rendered)}
                        <Comments anecdoteId={gallery[index].id} isModal />
                    </div>
                    <button className="button left" style={disabledPrev ? {display: "none"} : {display: "block"}} onClick={handlePrev}>
                        <FontAwesomeIcon icon={faCircleArrowLeft} />
                    </button>
                    <button className="button right" style={disabledNext ? {display: "none"} : {display: "block"}} onClick={handleNext}>
                        <FontAwesomeIcon icon={faCircleArrowRight} />
                    </button>
                </Modal>}
        </Fragment>
  )
}

export default Attachment