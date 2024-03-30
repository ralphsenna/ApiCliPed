import Cliente from "../Modelo/cliente.js";
import conectar from "./conexao.js";

export default class ClienteDAO
{
    async gravar(cliente)
    {
        if (cliente instanceof Cliente)
        {
            const conexao = await conectar();
            await conexao.beginTransaction();
            try
            {
                const sql = 'INSERT INTO cliente(cli_nome, cli_tel) VALUES(?,?)'; 
                const parametros = [cliente.nome, cliente.tel];
                const retorno = await conexao.execute(sql, parametros);
                cliente.cod = retorno[0].insertId;
                await conexao.commit();
            }
            catch (erro)
            {
                await conexao.rollback();
                throw erro;
            }
            finally
            {
                conexao.release();
            }
        }
    }

    async atualizar(cliente)
    {
        if (cliente instanceof Cliente)
        {
            const conexao = await conectar();
            await conexao.beginTransaction();
            try
            {
                const sql = 'UPDATE cliente SET cli_nome = ?, cli_tel = ? WHERE cli_cod = ?'; 
                const parametros = [cliente.nome, cliente.tel, cliente.cod];
                await conexao.execute(sql, parametros);
                await conexao.commit();
            }
            catch (erro)
            {
                await conexao.rollback();
                throw erro;
            }
            finally
            {
                conexao.release();
            }
        }
    }

    async excluir(cliente)
    {
        if (cliente instanceof Cliente)
        {
            const conexao = await conectar();
            await conexao.beginTransaction();
            try
            {
                const sql = 'DELETE FROM cliente WHERE cli_cod = ?'; 
                const parametros = [cliente.cod];
                await conexao.execute(sql, parametros); 
                await conexao.commit();
            }
            catch (erro)
            {
                await conexao.rollback();
                throw erro;
            }
            finally
            {
                conexao.release();
            }
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
        conexao.release();
        return listaClientes;
    }
}