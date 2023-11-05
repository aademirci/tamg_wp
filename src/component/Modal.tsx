import { useEffect } from "react"

interface IProps {
    open: boolean
    onClose: () => void
    onMount: () => void
    children: React.ReactNode
}

const Modal: React.FC<IProps> = ({ open, onClose, onMount, children }) => {
    useEffect(() => {
        document.body.classList.add('modal-open');
        onMount()

        return () => {
            document.body.classList.remove('modal-open');
        }
    }, [onMount])
    
  return (
    <div className="tamgModal" style={open ? {display: "block"} : {display: "none"}} onClick={onClose} >
        <div className="tamgModal-content" onClick={e => e.stopPropagation()}>
            { children }
            <button className="xButton" onClick={onClose}>x</button>
        </div>
    </div>
  )
}

export default Modal