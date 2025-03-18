import { Link } from 'react-router-dom';
import './header.css';


function Header(){
    return(
        <header>
            <Link className= "home" to = "/">Home</Link>
            <div className="logo">CONSULTA AO PNCP</div>
        </header>
    )
}

export default Header;