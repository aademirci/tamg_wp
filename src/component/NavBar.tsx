import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Fragment, useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { ITaxonomy } from "../model/anecdote"
import agent from "../api/agent"

const NavBar = () => {
	const [bands, setBands] = useState<ITaxonomy[]>([])
	const [persons, setPersons] = useState<ITaxonomy[]>([])
	const [search, setSearch] = useState('')
	const location = useLocation()
	const navigate = useNavigate()
	const isMobile = navigator.userAgent.indexOf("iPhone") != -1


	useEffect(() => {
		agent.Taxonomies.listBands().then(data => setBands(data))
		agent.Taxonomies.listPersons().then(data => setPersons(data))
	}, [])

	const sizeByCount = (count: number, isBand: boolean) => {
		const counts = isBand ? bands.map(band => band.count) : persons.map(person => person.count)
		const max = Math.max(...counts)

		const size = 24 * (count / max) > 12 ? 24 * (count / max) : 12

		return size
	}

	const handleClick = () => {
		navigate(`/search/${search}`)
	}

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			handleClick()
		}
	};

	return (
		<header>
			<nav className="main-menu">
				<Link to={'/'} className="logo" rel="home">
					<img src="https://turkiyedeagirmuzigingecmisi.com/wp-content/uploads/2019/02/cropped-tamg-logo2x.png" alt="Türkiye'de Ağır Müziğin Geçmişi" className="custom-logo" />
				</Link>
				<div className="menu-toggle">
					<FontAwesomeIcon icon={faBars} />
				
					<ul id="nav-menu" style={isMobile ? {height: 'calc(100vh - 172px)'} : {}}>
						<li><Link to={'/hakkinda'}>Hakkında</Link></li>
						{location.pathname === '/olay' ? 
						<Fragment></Fragment> : <li><Link to={'/olay'}>Tüm Olaylar</Link></li>}
						<li className="band-toggle">Gruplar
							<div className="band-list">
								<ul>
									{bands.sort((a,b) => a.name.charCodeAt(0) - b.name.charCodeAt(0)).map(band => (
										<li key={band.slug} style={{fontSize: `${sizeByCount(band.count, true)}px`}}>
											<Link to={`/grup/${band.slug}`}>{band.name} ({band.count})</Link>
										</li>
									))}
								</ul>
							</div>
						</li>
						<li className="person-toggle">Kişiler
							<div className="person-list">
								<ul>
									{persons.sort((a,b) => a.name.charCodeAt(0) - b.name.charCodeAt(0)).map(person => (
										<li key={person.slug} style={{fontSize: `${sizeByCount(person.count, false)}px`}}>
											<Link to={`/kisi/${person.slug}`}>{person.name} ({person.count})</Link>
										</li>
									))}
								</ul>
							</div>
						</li>
					</ul>
				</div>
			</nav>
			<div className="search-toggle">
				<FontAwesomeIcon icon={faSearch} />
				<div className="search-form">
					<input type="text" name="s" placeholder="Olaylarda ara..." value={search} onChange={e => setSearch(e.target.value)} onKeyDown={search ? handleKeyDown : undefined} />
					<button onClick={search ? handleClick : undefined}>Ara</button>
				</div>
			</div>
		</header>
	)
}

export default NavBar