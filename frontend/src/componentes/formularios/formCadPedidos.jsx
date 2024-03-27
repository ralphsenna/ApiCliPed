import { Form, Row, Col, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';

const urlCliente = "http://localhost:4000/cliente";

export default function FormCadPedidos(props)
{
    const [validado, setValidado] = useState(false);
    const [listaClientes, setListaClientes] = useState([{
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
        else
        {
            setValidado(false);
            props.gravarPedido(pedido);
        }
    }

    function buscarCliente()
    {
        fetch(urlCliente, {method: 'GET'})
        .then(resposta => resposta.json())
        .then(retorno => {
            if (retorno.status)
            {
                setListaClientes(retorno.listaClientes);
            }
        })
        .catch(erro => {
            setListaClientes([{
                cod: 0,
                nome: "Erro ao recuperar clientes: " + erro.message
            }]);
        });
    }
    useEffect(() => {
        buscarCliente();
    }, [listaClientes]);

    function selecionarCliente(evento)
    {
        const codigoCliente = evento.currentTarget.value;
        setPedido({...pedido, cliente: {
                "cod": codigoCliente
            }
        });
    }

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
                        placeholder="qtdItens"
                        value={pedido.qtdItens}
                        id="qtdItens"
                        name="qtdItens"
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type='invalid'>Por favor, informe a quantidade de itens do pedido.</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="6">
                    <Form.Label>Valor Total:</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="valTotal"
                        id="valTotal"
                        name="valTotal"
                        value={pedido.valTotal}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type='invalid'>Por favor, informe o valor total.</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="6" >
                    <Form.Label>Data do Pedido:</Form.Label>
                    <Form.Control 
                        required 
                        type="date" 
                        placeholder="data" 
                        value={pedido.data}
                        id="data"
                        name="data"
                        onChange={manipularMudanca}/>
                    <Form.Control.Feedback type="invalid">Por favor, informe a data do pedido.</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="3">
                    <Form.Label>Observação:</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="obs"
                        id="obs"
                        name="obs"
                        value={pedido.obs}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type='invalid'>Por favor, informe a observação.</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="10">
                    <Form.Label>Cliente:</Form.Label>
                    <Form.Select 
                        required
                        id='cliente' 
                        name='cliente'
                        value={pedido.cliente.cod}
                        onChange={selecionarCliente}
                    >
                    <option key={0} value={0}>Selecione um cliente</option>
                    {
                        listaClientes.map((cliente) => {
                            return (
                                <option key={cliente.cod} value={cliente.cod}>
                                    {cliente.nome}
                                </option>
                            );
                        })
                    }
                    </Form.Select>
                    <Form.Control.Feedback type='invalid'>Por favor, informe o cliente do pedido.</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Button type="submit">Gravar</Button>
            <Button onClick={() => {
                props.setExibirTabela(true);
            }}>Voltar</Button>
        </Form>
    );
}
