import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Pagina from "../templates/pagina";
import TabelaClientes from "../tabelas/tabelaClientes";
import FormCadClientes from "../formularios/formCadClientes";

const urlCliente = "http://localhost:4000/cliente";

export default function TelaCadastroCliente(props) 
{
    const [exibirTabela, setExibirTabela] = useState(true);
    const [listaClientes, setListaClientes] = useState([]);
    const [atualizando, setAtualizando] = useState(false);
    const clienteVazio = {
        cod: 0,
        nome: "",
        tel: ""
    };
    const [clienteAtual, setClienteAtual] = useState(clienteVazio);

    async function consultarCliente() 
    {
        await fetch(urlCliente, {method: 'GET'})
        .then(resposta => resposta.json())
        .then(retorno => {
            if (retorno.status) 
            {
                setListaClientes(retorno.listaClientes);
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
        if (exibirTabela)
            consultarCliente();
    }, [exibirTabela]);

    async function gravarCliente(cliente)
    {
        if (!atualizando)
        {
            await fetch(urlCliente, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(cliente)
            })
            .then(resposta => resposta.json())
            .then(retorno => {
                if (retorno.status)
                {
                    alert(retorno.mensagem + " Código do cliente: " + retorno.codigoGerado);
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
        else
        {
            await fetch(urlCliente, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(cliente)
            })
            .then(resposta => resposta.json())
            .then(retorno => {
                if (retorno.status)
                {
                    alert(retorno.mensagem);
                }
                else
                {
                    alert(retorno.mensagem);
                }
            })
            .catch(erro => {
                alert("Erro: " + erro.message);
            });
            setAtualizando(false);
        }
        setExibirTabela(true);
        setClienteAtual(clienteVazio);
    }

    async function atualizarCliente(cliente) 
    {
        setExibirTabela(false);
        setAtualizando(true);
        setClienteAtual(cliente);
    }

    async function excluirCliente(cliente)
    {
        await fetch(urlCliente, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({cod: cliente.cod})
        })
        .then(resposta => resposta.json())
        .then(retorno => {
            if (retorno.status)
            {
                alert(retorno.mensagem);
            }
            else
            {
                alert(retorno.mensagem);
            }
        })
        .catch(erro => {
            alert("Erro: " + erro.message);
        });
        consultarCliente();
    }

    if (exibirTabela) 
    {
        return (
            <div>
                <Pagina>
                    <h1>Tela de Cadastro de Clientes</h1>
                    <br/>
                    <h2>Lista de Clientes</h2>
                    <Button onClick={() => {
                            setExibirTabela(false);
                        }}>
                        Cadastrar Novo Cliente
                    </Button>
                    <TabelaClientes listaClientes={listaClientes} atualizarCliente={atualizarCliente} excluirCliente={excluirCliente} setExibirTabela={setExibirTabela}/>
                </Pagina>
            </div>
        )
    }
    else 
    {
        return (
            <div>
                <Pagina>
                    <h1>Tela de Cadastro de Clientes</h1>
                    <br/>
                    <h2>Formulário de cadastro de Clientes</h2>
                    <FormCadClientes 
                        exibirTabela={exibirTabela}
                        setExibirTabela={setExibirTabela}
                        gravarCliente={gravarCliente}
                        atualizando={atualizando}
                        setAtualizando={setAtualizando}
                        cliente={clienteAtual}
                        setClienteAtual={setClienteAtual}
                        clienteVazio={clienteVazio}
                    />
                </Pagina>
            </div>
        )
    }
}
