import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Pagina from "../templates/pagina";
import TabelaPedidos from "../tabelas/tabelaPedidos";
import FormCadPedidos from "../formularios/formCadPedidos";

const url = "http://localhost:4000/pedido";

export default function TelaCadastroPedido(props) 
{
    const [exibirTabela, setExibirTabela] = useState(true);
    const [listaPedidos, setListaPedidos] = useState([]);

    function buscarPedidos() 
    {
        fetch(url, {method: 'GET'})
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

    function gravarPedido(pedido)
    {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(pedido)
        })
        .then(resposta => resposta.json())
        .then(retorno => {
            if (retorno.status)
            {
                alert(retorno.mensagem + " Código do pedido: " + retorno.codigoGerado);
                setListaPedidos([...listaPedidos, pedido]);
                setExibirTabela(true);
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

    function excluirPedido(pedido)
    {
        fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({cod: pedido.cod})
        })
        .then(resposta => resposta.json())
        .then(retorno => {
            if (retorno.status)
            {
                alert(retorno.mensagem);
                const novaListaPedidos = listaPedidos.filter(pedNovo => pedNovo.cod!==pedido.cod);
                setListaPedidos(novaListaPedidos);
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
    
    if (exibirTabela) 
    {
        return (
            <div>
                <Pagina>
                    <h1>Tela de Cadastro de Pedidos</h1>
                    <br/>
                    <h2>Lista de Pedidos</h2>
                    <Button onClick={() => {
                            setExibirTabela(false);
                        }}>
                        Cadastrar Novo Pedido
                    </Button>
                    <TabelaPedidos listaPedidos={listaPedidos} excluirPedido={excluirPedido} setExibirTabela={setExibirTabela}/>
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
                        gravarPedido={gravarPedido}
                    />
                </Pagina>
            </div>
        )
    }
}
