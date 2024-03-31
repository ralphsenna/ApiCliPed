import { Form, Row, Col, Button } from 'react-bootstrap';
import { useState } from 'react';

export default function FormCadClientes(props) 
{
    const [validado, setValidado] = useState(true);
    const [cliente, setCliente] = useState(props.cliente);

    function manipularMudanca(evento) 
    {
        const componente = evento.currentTarget;
        setCliente({...cliente, [componente.name]: componente.value});
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
            props.gravarCliente(cliente)
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
                        value={cliente.cod}
                        id="cod"
                        name="cod"
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type='invalid'>Por favor, informe o código do cliente.</Form.Control.Feedback>  {/* verificar sobre */}
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="validationCustom01">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Nome Completo"
                        id="nome"
                        name="nome"
                        value={cliente.nome}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type='invalid'>Por favor, informe o primeiro nome.</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="2" controlId="validationCustom02">
                    <Form.Label>Telefone</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Telefone"
                        id="tel"
                        name="tel"
                        value={cliente.tel}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type='invalid'>Por favor, informe o telefone.</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Button style={{marginRight:'5px'}} type="submit">
                {props.atualizando ? 'Atualizar' : 'Gravar'}
            </Button>
            <Button onClick={() => {
                if (props.atualizando)
                    props.setAtualizando(false);
                props.setExibirTabela(true);
                props.setClienteAtual(props.clienteVazio);
            }}>Voltar</Button>
        </Form>
    );
}
