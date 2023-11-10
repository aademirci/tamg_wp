
interface IProps {
    children: React.ReactNode
    id: string
}

const AnecdoteInfo: React.FC<IProps> = ({ children, id }) => {
  const isMobile = navigator.userAgent.indexOf("iPhone") != -1
  const isSingle = document.body.classList.contains('single')

  return (
    <div id={id} className="anecdote info" style={isMobile ? isSingle ? {height: 'calc(100vh - 178px)'} : {height: 'calc(100vh - 220px)'} : {}}>{children}</div>
  )
}

export default AnecdoteInfo