import { Link } from "react-router-dom";
import api from "../../services/api";
import "./home.css" 


function Home(){
    return(
        <div className="acessos">
            <Link className= "contratos" to = "/contratos">Contratos por data de publicação</Link>
            <Link className= "contratacoes" to = "/contratacoes">Contratações por data de publicação</Link>
        </div>
    )
}

export default Home;