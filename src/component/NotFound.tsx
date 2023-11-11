interface IProps {
    type?: string
}

const NotFound: React.FC<IProps> = ({ type }) => {
  return (
    <div>
        {type ? `Aradığınız ${type} bulunamadı.` : "Aradığınız sayfa bulunamadı"}
    </div>
  )
}

export default NotFound