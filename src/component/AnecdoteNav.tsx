import { faArrowDownWideShort, faArrowUpWideShort, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ChangeEvent, useEffect, useState } from "react"
import agent from "../api/agent"
import { IYears } from "../model/anecdote"

interface IProps {
    callback?: () => void,
    setYear?: (y: number) => void,
    year?: number,
    order?: string,
    setOrder?: (o: string) => void
}

const AnecdoteNav: React.FC<IProps> = ({ callback, year, setYear, order, setOrder }) => {
    const [years, setYears] = useState<IYears[]>([])

    useEffect(() => {
        agent.Anecdotes.getYears().then(result => setYears(result))
    }, [setYears])

    const scrollTo = (direction: string, end?: boolean ) => {
        const anecdoteWidth = window.innerWidth
        if (direction === 'left' && end) document.getElementsByClassName('main-section')[0].scrollTo({left: 0, behavior: 'smooth'})
        if (direction === 'left' && !end) document.getElementsByClassName('main-section')[0].scrollBy({left: -anecdoteWidth, behavior: 'smooth'})
        if (direction === 'right' && !end) document.getElementsByClassName('main-section')[0].scrollBy({left: anecdoteWidth, behavior: 'smooth'})
    }

    const handleToggle = () => {
        if (order === 'asc')
            setOrder!('desc')
        else
            setOrder!('asc')
        callback!()
    }

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        if (e.target.value === '1') {
            if (year !== 1) {
                setYear!(1)
                callback!()
            }
            return
        }
        const value = e.target.value
        const selectedYear = parseInt(value!)
        callback!()
        setYear!(selectedYear)
    }

  return (
    <div className="anecdoteNav">
        <button onClick={() => scrollTo('left', true)} title="En başa dön">
            <FontAwesomeIcon icon={faChevronLeft} />
            <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <button onClick={() => scrollTo('left', false)} title="Önceki">
            <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        {year &&
        <select onChange={handleChange}>
            <option key={'notSelected'} value="1">Tüm yıllar</option>
            {years && years.map(year => {
                return <option key={year.year} value={year.year}>{year.year} ({year.posts})</option>
            })}
        </select>
        }
        {order &&
        <button onClick={handleToggle} title={order === 'asc' ? 'Sırala: Geçmişten bugüne' : 'Sırala: Bugünden geçmişe'}>
            Sıralama: {order === 'asc' ? <FontAwesomeIcon icon={faArrowUpWideShort} /> : <FontAwesomeIcon icon={faArrowDownWideShort} />}
        </button>
        }
        <button onClick={() => scrollTo('right', false)} title="Sonraki">
            <FontAwesomeIcon icon={faChevronRight} />
        </button>
    </div>
  )
}

export default AnecdoteNav