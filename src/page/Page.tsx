import { Fragment, useEffect, useState } from "react"
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
        agent.Pages.selected(slug!).then((data) => {
            if(data.length) setPage(data[0])
            else setError(true)
        })
    }, [slug])

    if (error) return <NotFound type="sayfa" />

    return (
        <Fragment>
            <h1>{page && parse(page.title.rendered)}</h1>
            <div>{page && parse(page.content.rendered)}</div>
        </Fragment>
    )
}

export default Page