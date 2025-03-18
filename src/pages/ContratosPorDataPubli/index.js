import { useEffect, useState } from "react";
import api from "../../services/api";
import "./contratos.css" 


function Contratos(){
    const [contratos, setContratos] = useState([]);
    const [dataInic, setDataInic] = useState("20250101");
    const [dataFim, setDataFim] = useState("20250102");
    const [loading, setLoading] = useState(0);

    let dados = [];
    let chave = 0;

    function handlerRegister(e){
        e.preventDefault();
        async function loadContratos(){
            let pag = 1
            let pagrestantes = 1
            while(pagrestantes !== 0){
                const response = await api.get("v1/contratos",{
                    params:{
                        dataInicial: dataInic,
                        dataFinal: dataFim,
                        pagina: pag,
                    }
                })
                dados = [...dados,...response.data.data]
                pagrestantes = response.data.paginasRestantes
                pag++
                console.log(`segue`,dados)
                console.log(pagrestantes)
                setLoading(pagrestantes)
            }
      //      setLoading (false)
            setContratos(dados)
//            console.log(`segue`,dados)
 //           console.log(response.data.data)
  //          console.log(response.data.paginasRestantes)
        }
        
        loadContratos();

    }

    // useEffect(()=>{
    // }, [])

    if(loading !==0){
        return(
            <div className="loading">
                <h2>Carregando contratos...{loading}</h2>
            </div>
        )
    }

    return(
        <div className ="container">
            <div className= "titulo">CONSULTA DOS CONTRATOS POR DATA DE PUBLICAÇÃO</div><br/>
            <div className = "pesquisa">
                <form onSubmit={handlerRegister}>
                    <label>Data Início:</label><br/>
                    <input
                    placeholder="Digite a data de início"
                    value={dataInic}
                    onChange={(e)=>setDataInic(e.target.value)}
                    /><br/><br/>

                    <label>Data Fim:</label><br/>
                    <input
                    placeholder="Digite a data de Fim"
                    value={dataFim}
                    onChange={(e)=>setDataFim(e.target.value)}
                    /><br/><br/>

                    <button type="submit">Pesquisar</button>
                </form><br/>
            </div>
            <div className = "lista-contratos">
                <table>     
                    <thead>
                            <tr>
                               <th>N° PNCP</th>
                               <th>Valor</th>
                               <th>Órgão</th>
                               <th>Estado</th>
                               <th>Data Assinatura</th>
                               <th>Objeto do Contrato</th>
                            </tr>
                    </thead>
                    <tbody>
                            {contratos.map((contrato)=>{
                            chave++
                            return(
                                <tr key={chave}>
                                     <th>{contrato.numeroControlePNCP}</th>
                                     <th>{contrato.valorGlobal}</th>
                                     <th>{contrato.orgaoEntidade.razaoSocial}</th>
                                     <th>{contrato.unidadeOrgao.ufSigla}</th>
                                     <th>{contrato.dataAssinatura}</th>
                                     <th>{contrato.objetoContrato}</th>

                                 </tr>
                            )
                            })}
                    </tbody>
                </table>
            </div>
        </div>


    )
}

export default Contratos;