import { Form, Row, Col, Button } from 'react-bootstrap';
import { useState } from 'react';

export default function FormCadPedidos(props)
{
    const [validado, setValidado] = useState(true);
    const [pedido, setPedido] = useState(props.pedido);

    function manipularMudanca(evento) 
    {
        const componente = evento.currentTarget;
        if (componente.name==='cliente')
        {
            setPedido({...pedido, cliente: {"cod": componente.value}});
        }
        else
        {
            setPedido({ ...pedido, [componente.name]: componente.value});
        }
    }

    function manipularSubmissao(evento) 
    {
        evento.preventDefault();
        evento.stopPropagation();
        const form = evento.currentTarget;
        if (!form.checkValidity())
        {
            setValidado(false);
        }
        else
        {
            setValidado(true);
            props.gravarPedido(pedido);
        }
    }

    return (
        <Form noValidate validated={!validado} onSubmit={manipularSubmissao}>
            <Row className="mb-3">
                <Form.Group as={Col} md="1">
                    <Form.Label>Código</Form.Label>
                    <Form.Control
                        disabled
                        type="number"
                        placeholder="0"
                        value={pedido.cod}
                        id="cod"
                        name="cod"
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type='invalid'>Por favor, informe o código do pedido.</Form.Control.Feedback> {/* verificar sobre */}
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="2">
                    <Form.Label>Qtd. de Itens:</Form.Label>
                    <Form.Control
                        required
                        type="number"
                        placeholder="Qtd. de Itens"
                        value={pedido.qtdItens}
                        id="qtdItens"
                        name="qtdItens"
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type='invalid'>Por favor, informe a quantidade de itens do pedido.</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="3">
                    <Form.Label>Valor Total:</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Valor Total"
                        id="valTotal"
                        name="valTotal"
                        value={pedido.valTotal}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type='invalid'>Por favor, informe o valor total.</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="2" >
                    <Form.Label>Data do Pedido:</Form.Label>
                    <Form.Control 
                        required 
                        type="date" 
                        placeholder="Data do Pedido" 
                        id="data"
                        name="data"
                        value={pedido.data}
                        onChange={manipularMudanca}
                        max={new Date(Date.now()).toISOString().split("T")[0]}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe a data do pedido.</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="7">
                    <Form.Label>Observação:</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Observação"
                        id="obs"
                        name="obs"
                        value={pedido.obs}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type='invalid'>Por favor, informe a observação.</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="3">
                    <Form.Label>Cliente:</Form.Label>
                    <Form.Select 
                        required
                        id='cliente' 
                        name='cliente'
                        value={pedido.cliente.cod}
                        onChange={manipularMudanca}
                    >
                        {
                            props.listaClientes[0].cod!=="" ?
                            (
                                <><option key={0} value={""}>Selecione um cliente</option>
                                {
                                    props.listaClientes.map((cliente) => {
                                        return (
                                            <option key={cliente.cod} value={cliente.cod}>{cliente.nome}</option>
                                        );
                                    }) 
                                }</>
                            ): <option key={0} value={""}>{props.listaClientes[0].nome}</option>
                        }
                    </Form.Select>
                    <Form.Control.Feedback type='invalid'>Por favor, selecione um cliente.</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Button style={{marginRight:'5px'}} type="submit">
                {props.atualizando ? 'Atualizar' : 'Gravar'}
            </Button>
            <Button onClick={() => {
                if (props.atualizando)
                    props.setAtualizando(false);
                props.setExibirTabela(true);
                props.setPedidoAtual(props.pedidoVazio);
            }}>Voltar</Button>
        </Form>
    );
}
