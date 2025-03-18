import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Home from './pages/Home'
import Contratos from './pages/ContratosPorDataPubli'
import Contratacoes from './pages/ContratacoesPorData'

import Header from './components/Header'

function RoutesApp(){
    return(
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path= "/" element = { <Home/>}/>
                <Route path= "/contratos" element = { <Contratos/>}/>
                <Route path= "/contratacoes" element = { <Contratacoes/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp;