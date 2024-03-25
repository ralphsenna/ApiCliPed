import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useState } from 'react';

export default function FormCadClientes(props) 
{
    const [validado, setValidado] = useState(false);
    const [cliente, setCliente] = useState({
        cod: 0,
        nome: "",
        tel: ""
    });

    function manipularMudanca(evento) 
    {
        const componente = evento.currentTarget;
        setCliente({ ...cliente, [componente.name]: componente.value });
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
            fetch('http://localhost:4000/cliente', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(cliente)
            })
            .then(resposta => resposta.json())
            .then(retorno => {
                if (retorno.status) 
                {
                    alert(retorno.mensagem + " Código do cliente: " + retorno.codigoGerado);
                    props.setListaClientes([...props.listaClientes, cliente]);
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

    return (
        <Form noValidate validated={validado} onSubmit={manipularSubmissao}>
            <Row className="mb-3">
                <Form.Group as={Col} md="4">
                    <Form.Label>Código</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="0"
                        value={cliente.cod}
                        id="cod"
                        name="cod"
                        onChange={manipularMudanca}
                        disabled
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
                        value={cliente.nome}
                        id="nome"
                        name="nome"
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
            <Button type="submit">Gravar</Button>
            <Button onClick={() => {
                props.setExibirTabela(true);
            }}>Voltar</Button>
        </Form>
    );
}
