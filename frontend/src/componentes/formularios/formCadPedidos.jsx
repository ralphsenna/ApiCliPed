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
                        type="date" 
                        placeholder="data" 
                        required 
                        value={pedido.data}
                        id="data"
                        name="data"
                        onChange={manipularMudanca}/>
                    <Form.Control.Feedback type="invalid">Por favor, informe a data do pedido.</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="3">
                    <Form.Label>Observação:</Form.Label>
                    <Form.Control
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
                        id='cliente' 
                        name='cliente'
                        value={pedido.cliente.cod}
                        onChange={selecionarCliente}
                    >
                    <option key={0} value={0}>Selecione um cliente</option>
                    {
                        clientes.map((cliente) => {
                            return (
                                <option key={cliente.cod} value={cliente.cod}>
                                    {cliente.nome}
                                    {cliente.tel}
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