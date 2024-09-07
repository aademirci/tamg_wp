import { useEffect } from "react"

interface IProps {
    type?: string
}

const NotFound: React.FC<IProps> = ({ type }) => {
    useEffect(() => {
        document.title = "404 Bulunamadı - Türkiye'de Ağır Müziğin Geçmişi"
    }, [])

    return (
        <div className="not-found">
            {type ? `Aradığınız ${type} bulunamadı.` : "Aradığınız sayfa bulunamadı"}
        </div>
  )
}

export default NotFound