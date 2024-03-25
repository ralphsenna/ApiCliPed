import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useState, useEffect } from 'react';

export default function FormCadPedidos(props)
{
    const [validado, setValidado] = useState(false);
    const [clientes, setClientes] = useState([{
        cod: 0,
        nome: "Nenhuma cliente cadastrado"
    }]);
    const [pedido, setPedido] = useState({
        cod: 0,
        qtdItens: 0,
        valTotal: 0,
        data: "",
        obs: "",
        cliente:{}
    });

    function manipularMudanca(evento) 
    {
        const componente = evento.currentTarget;
        setPedido({ ...pedido, [componente.name]: componente.value });
    }

    function manipularSubmissao(evento) 
    {
        evento.preventDefault();
        evento.stopPropagation();
        const form = evento.currentTarget;
        if (form.checkValidity()===false) 
        {
            setValidado(true);
        }
        else{
            setValidado(false);
            fetch('http://localhost:4000/pedido', {
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
                    props.setListaPedidos([...props.listaPedidos, pedido]);
                    props.setExibirTabela(true);
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
    }

    function selecionarCliente(evento)
    {
        const codigoCliente = evento.currentTarget.value;
        setPedido({...pedido, cliente: {
                "cod": codigoCliente
            }
        });
    }

    function buscarCliente()
    {
        fetch('http://localhost:4000/cliente',{method: 'GET'})
        .then(resposta => resposta.json())
        .then(retorno => {
            if (retorno.status)
            {
                setClientes(retorno.listaClientes);
            }
        })
        .catch(erro => {
            setClientes([{
                cod: 0,
                nome: "Erro ao recuperar clientes: " + erro.message
            }]);
        });
    }

    useEffect(() => {
        buscarCliente();
    }, []);

    return (
        <Form noValidate validated={validado} onSubmit={manipularSubmissao}>
            <Row className="mb-3">
                <Form.Group as={Col} md="4">
                    <Form.Label>Código</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="0"
                        value={pedido.cod}
                        id="cod"
                        name="cod"
                        onChange={manipularMudanca}
                        disabled
                    />
                    <Form.Control.Feedback type='invalid'>Por favor, informe o código do pedido.</Form.Control.Feedback> {/* verificar sobre */}
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="12">
                    <Form.Label>Qtd. de Itens:</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="quantidade de itens"
                        value={pedido.descricao}
                        id="qtdItens"
                        name="qtdItens"
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type='invalid'>Por favor, informe a descrição do pedido.</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="6">
                    <Form.Label>Preço de Custo:</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="precoCusto"
                        id="precoCusto"
                        name="precoCusto"
                        value={pedido.precoCusto}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type='invalid'>Por favor, informe o preço de custo.</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="6">
                    <Form.Label>Preço de Venda:</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="precoVenda"
                        id="precoVenda"
                        name="precoVenda"
                        value={pedido.precoVenda}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type='invalid'>Por favor, informe o preço de venda.</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="6" >
                    <Form.Label>Válido até:</Form.Label>
                    <Form.Control 
                        type="date" 
                        placeholder="" 
                        required 
                        value={pedido.dataValidade}
                        id="dataValidade"
                        name="dataValidade"
                        onChange={manipularMudanca}/>
                    <Form.Control.Feedback type="invalid">
                        Por favor, informe a data de validade do pedido.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="3">
                    <Form.Label>Qtd em Estoque:</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="0"
                        id="qtdEstoque"
                        name="qtdEstoque"
                        value={pedido.qtdEstoque}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type='invalid'>Por favor, informe a quantidade em estoque desse pedido.</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="10">
                    <Form.Label>Cliente:</Form.Label>
                    <Form.Select 
                        id='cliente' 
                        name='cliente'
                        value={pedido.cliente.codigo}
                        onChange={selecionarCliente}
                    >
                    <option key={0} value={0}>Selecione uma cliente</option>
                    {
                        clientes.map((cliente) => {
                            return (
                                <option key={cliente.codigo} value={cliente.codigo}>
                                    {cliente.descricao}
                                </option>
                            );
                        })
                    }
                    </Form.Select>
                    <Form.Control.Feedback type='invalid'>Por favor, informe a cliente do pedido.</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Button type="submit">Gravar</Button>
            <Button onClick={() => {
                props.setExibirTabela(true);
            }}>Voltar</Button>
        </Form>
    );
}