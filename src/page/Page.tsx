import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import agent from "../api/agent"
import { IPage } from "../model/page"
import parse from "html-react-parser"
import NotFound from "../component/NotFound"

type IParams = {
    slug: string
}

const Page: React.FC = () => {
    const { slug } = useParams<IParams>()
    const [page, setPage] = useState<IPage>()
    const [error, setError] = useState(false)

    useEffect(() => {
        if (page) document.title = `${page.title.rendered} - Türkiye'de Ağır Müziğin Geçmişi`
        document.body.classList.add('single-page')
        agent.Pages.selected(slug!).then((data) => {
            if(data.length) setPage(data[0])
            else setError(true)
        })

        return () => {
            document.body.classList.remove('single-page')
        }
    }, [slug, page])

    if (error) return <NotFound type="sayfa" />

    return (
        <div className="content-area page">
            <article>
                <h1>{page && parse(page.title.rendered)}</h1>
                <div>{page && parse(page.content.rendered)}</div>
            </article>
        </div>
        
    )
}

export default Page