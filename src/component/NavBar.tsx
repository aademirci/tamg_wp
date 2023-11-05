import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Fragment, useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { ITaxonomy } from "../model/anecdote"
import agent from "../api/agent"

const NavBar = () => {
	const [bands, setBands] = useState<ITaxonomy[]>([])
	const [persons, setPersons] = useState<ITaxonomy[]>([])
	const location = useLocation();


	useEffect(() => {
		agent.Taxonomies.listBands().then(data => setBands(data))
		agent.Taxonomies.listPersons().then(data => setPersons(data))
	})

	return (
		<header>
			<nav className="main-menu">
				<div className="menu-toggle">
					<FontAwesomeIcon icon={faBars} />
				</div>
				<Link to={'/'} className="logo" rel="home">
					<img src="https://turkiyedeagirmuzigingecmisi.com/wp-content/uploads/2019/02/cropped-tamg-logo2x.png" alt="Türkiye'de Ağır Müziğin Geçmişi" className="custom-logo" />
				</Link>
				<ul>
					<li><Link to={'#'}>Hakkında</Link></li>
					{location.pathname === '/olay' ? 
					<Fragment></Fragment> : <li><Link to={'/olay'}>Tüm Olaylar</Link></li>}
					<li className="band-toggle">Gruplar
						<div className="band-list">
							<ul>
								{bands.map(band => (
									<li key={band.slug}>
										<Link to={`/grup/${band.slug}`}>{band.name} ({band.count})</Link>
									</li>
								))}
							</ul>
						</div>
					</li>
					<li className="person-toggle">Kişiler
						<div className="person-list">
							<ul>
								{persons.map(person => (
									<li key={person.slug}>
										<Link to={`/kisi/${person.slug}`}>{person.name} ({person.count})</Link>
									</li>
								))}
							</ul>
						</div>
					</li>
				</ul>
			</nav>
			<div className="search-toggle">
				<FontAwesomeIcon icon={faSearch} />
				<div className="search-form">
					<input type="text" name="s" placeholder="Olaylarda ara..." />
					<input type="hidden" name="post_type" value="olay" />
					<button>Ara</button>
				</div>
			</div>
		</header>
	)
}

export default NavBar