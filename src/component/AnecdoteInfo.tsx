
interface IProps {
    children: React.ReactNode
    id: string
}

const AnecdoteInfo: React.FC<IProps> = ({ children, id }) => {
  return (
    <div id={id} className="anecdote info">{children}</div>
  )
}

export default AnecdoteInfo