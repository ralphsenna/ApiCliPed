import FormCadPedidos from "../formularios/formCadPedidos";
import TabelaPedidos from "../tabelas/tabelaPedidos";
import Pagina from "../templates/pagina";
import { useEffect, useState } from "react";

export default function TelaCadastroPedido(props) 
{
    const [exibirTabela, setExibirTabela] = useState(true);
    const [listaPedidos, setListaPedidos] = useState([]);

    function buscarPedidos() 
    {
        fetch('http://localhost:4000/pedido', {method: 'GET'})
        .then(resposta => resposta.json())
        .then(retorno => {
            if (retorno.status) 
            {
                setListaPedidos(retorno.listaPedidos);
            }
            else 
            {
                alert(retorno.mensagem);
            }
        })
        .catch(erro => {
            alert("Erro: " + erro.message);
        });
    }

    useEffect(() => {
        buscarPedidos();
    }, [listaPedidos]);

    if (exibirTabela) 
    {
        return (
            <div>
                <Pagina>
                    <h1>Tela de Cadastro de Pedidos</h1>
                    <br/>
                    <h2>Lista de Pedidos</h2>
                    <TabelaPedidos listaPedidos={listaPedidos} setExibirTabela={setExibirTabela}/>
                </Pagina>
            </div>
        )
    }
    else 
    {
        return (
            <div>
                <Pagina>
                    <h1>Tela de Cadastro de Pedidos</h1>
                    <br/>
                    <h2>Formulário de cadastro de Pedidos</h2>
                    <FormCadPedidos 
                        setExibirTabela={setExibirTabela}
                        listaPedidos={listaPedidos}
                        setListaPedidos={setListaPedidos}
                    />
                </Pagina>
            </div>
        )
    }
}
