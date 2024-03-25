import { Button, Table } from "react-bootstrap";

export default function TabelaPedidos(props) 
{
    return (
        <div>
            <Button onClick={() => {
                props.setExibirTabela(false);
            }}>
                Cadastrar Novo Pedido
            </Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Qtd. de Itens</th>
                        <th>Valor Total</th>
                        <th>Data</th>
                        <th>Observação</th>
                        <th>Cliente</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.listaPedidos?.map((pedido) => {
                            return (
                                <tr key={pedido.cod}>
                                    <td>{pedido.cod}</td>
                                    <td>{pedido.qtdItens}</td>
                                    <td>{pedido.valTotal}</td>
                                    <td>{new Date(pedido.data).toLocaleDateString()}</td>
                                    <td>{pedido.obs}</td>
                                    <td>{pedido.cliente.nome}</td>
                                    <td>
                                        <Button variant="primary" /* onClick={() => {props.alterarPedido(pedido)}} */>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                                            </svg>
                                        </Button> {'  '}
                                        <Button variant="danger" /* onClick={() => {props.excluirPedido(pedido)}} */>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
                                            </svg>
                                        </Button>
                                    </td>	
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </div>
    )
}
