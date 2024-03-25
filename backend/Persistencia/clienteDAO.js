import Cliente from "../Modelo/cliente.js";
import conectar from "./conexao.js";

export default class ClienteDAO
{
    async gravar(cliente)
    {
        if (cliente instanceof Cliente)
        {
            const sql = 'INSERT INTO cliente(cli_nome, cli_tel) VALUES(?,?)'; 
            const parametros = [cliente.nome, cliente.tel];
            const conexao = await conectar();
            const retorno = await conexao.execute(sql, parametros);
            cliente.cod = retorno[0].insertId;
        }
    }

    async atualizar(cliente)
    {
        if (cliente instanceof Cliente)
        {
            const sql = 'UPDATE cliente SET cli_nome = ?, cli_tel = ? WHERE cli_cod = ?'; 
            const parametros = [cliente.nome, cliente.tel, cliente.cod];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
        }
    }

    async excluir(cliente)
    {
        if (cliente instanceof Cliente)
        {
            const sql = 'DELETE FROM cliente WHERE cli_cod = ?'; 
            const parametros = [cliente.cod];
            const conexao = await conectar();
            await conexao.execute(sql, parametros); 
        }
    }

    async consultar(parametroConsulta)
    {
        let sql = '';
        let parametros=[];
       
        if (!isNaN(parseInt(parametroConsulta)))
        {
            sql = 'SELECT * FROM cliente WHERE cli_cod = ? order by cli_nome';
            parametros = [parametroConsulta];
        }
        else
        {
            if (!parametroConsulta)
            {
                parametroConsulta = '';
            }
            sql = 'SELECT * FROM cliente WHERE cli_nome like ?';
            parametros = ['%'+parametroConsulta+'%'];
        }
        const conexao = await conectar();
        const [registros] = await conexao.execute(sql, parametros);
        let listaClientes = [];
        for (const registro of registros)
        {
            const cliente = new Cliente(registro.cli_cod, registro.cli_nome, registro.cli_tel);
            listaClientes.push(cliente);
        }
        return listaClientes;
    }
}