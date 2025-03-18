import { useEffect, useState } from "react";
import api from "../../services/api";
import "./contratacoes.css" 


function Contratacoes(){
    const [contratos, setContratos] = useState([]);
    const [dataInic, setDataInic] = useState("20250101");
    const [dataFim, setDataFim] = useState("20250102");
    const [modalidade, setModalidade] = useState(6)
    const [loading, setLoading] = useState(0);

    let dados = [];
    let chave = 0;


    function handlerRegister(e){
        e.preventDefault();
        async function loadContratos(){
            let pag = 1
            let pagrestantes = 1
            while(pagrestantes !== 0){
                const response = await api.get("v1/contratacoes/publicacao",{
                    params:{
                        dataInicial: dataInic,
                        dataFinal: dataFim,
                        codigoModalidadeContratacao: modalidade,
                        pagina: pag,
                        tamanhoPagina: 500,
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
            <div className="titulo">CONSULTA DAS CONTRATAÇÕES POR DATA DE PUBLICAÇÃO</div><br/>
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

                    <label>
                    Selecione a modalidade: 
                    <select name="modalidade" 
                    value={modalidade}
                    onChange={e => setModalidade(e.target.value)}>
                            <option value="1">Leilão Eletrônico</option>
                            <option value="2">Diálogo Competitivo</option>
                            <option value="3">Concurso</option>
                            <option value="4">Concorrência - Eletrônica</option>
                            <option value="5">Concorrência - Presencial</option>
                            <option value="6">Pregão - Eletrônico</option>
                            <option value="7">Pregão - Presencial</option>
                            <option value="8">Dispensa de Licitação</option>
                            <option value="9">Inexigibilidade</option>
                            <option value="10">Manifestação de Interesse</option>
                            <option value="11">Pré-qualificação</option>
                            <option value="12">Credenciamento</option>
                            <option value="13">Leilão Presencial</option>
                        </select>
                        </label><br/><br/>



                    <button type="submit">Pesquisar</button><br/>
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
                               <th>Data Inclusão</th>
                               <th>Objeto do Contrato</th>
                            </tr>
                    </thead>
                    <tbody>
                            {contratos.map((contrato)=>{
                            chave++
                            return(
                                <tr key={chave}>
                                     <th>{contrato.numeroControlePNCP}</th>
                                     <th>{contrato.valorTotalHomologado}</th>
                                     <th>{contrato.orgaoEntidade.razaoSocial}</th>
                                     <th>{contrato.unidadeOrgao.ufSigla}</th>
                                     <th>{contrato.dataInclusao}</th>
                                     <th>{contrato.objetoCompra}</th>

                                 </tr>
                            )
                            })}
                    </tbody>
                </table>
            </div>
        </div>


    )
}

export default Contratacoes;