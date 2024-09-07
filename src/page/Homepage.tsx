import { faArrowRight, faExternalLink } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"

const Homepage = () => {
    return (
        <div>
            <div className="brand">
                <h1 id="heading"><img src="https://turkiyedeagirmuzigingecmisi.com/wp-content/themes/tamg/img/tamg-amblem.png" alt="Türkiye'de Ağır Müziğin Geçmişi" /><span>Türkiye'de <span className="line2">Ağır <br /> Müziğin</span> Geçmişi</span></h1>
                <p>
                    Türkiye'de 1981'den günümüze heavy metal, rock, punk gibi elektrikli müziklerin geçmişini fotoğraflar, konser afişleri, gazete/dergi kupürleri, fanzin sayfaları veya videolar ile belgeliyoruz. Bu belgeleri tarihi belirli olayların içerisinde, bir zaman tüneli biçiminde sunuyoruz. 
                </p>
                <div id="actions">
                    <Link to="/olay" className="action">Olaylar: Zaman Tüneli <FontAwesomeIcon icon={faArrowRight} /></Link>
                    <Link to="/hakkinda" className="action">Hakkında</Link>
                    <a href="https://www.twitter.com/trde_agir_muzik" target="blank">Twitter <FontAwesomeIcon icon={faExternalLink} /></a>
                    <a href="https://www.instagram.com/trde_agir_muzik" target="blank">Instagram <FontAwesomeIcon icon={faExternalLink} /></a>
                    <a href="https://www.youtube.com/c/TürkiyedeAğırMüziğinGeçmişi" target="blank">YouTube <FontAwesomeIcon icon={faExternalLink} /></a>
                    <a href="https://spoti.fi/3VFiiaZ" target="blank">Podcast (Spotify) <FontAwesomeIcon icon={faExternalLink} /></a>
                    <a href="https://destekdukkan.com/magaza/urun/turkiyede-agir-muzigin-gecmisi" target="blank">Kitap <FontAwesomeIcon icon={faExternalLink} /></a>
                </div>
                
            </div>
        </div>
    )
}

export default Homepage