import Pedido from '../Modelo/pedido.js';
import Cliente from '../Modelo/cliente.js';
import conectar from './conexao.js';

export default class PedidoDAO 
{
    async gravar(pedido) 
    {
        if (pedido instanceof Pedido)
        {
            const conexao = await conectar();
            await conexao.beginTransaction();
            try
            {
                const sql = `INSERT INTO pedido(ped_qtdItens, ped_valTotal, ped_data, 
                            ped_obs, cli_cod) VALUES(?,?,?,?,?)`;
                const parametros = [pedido.qtdItens, pedido.valTotal, pedido.data,
                                    pedido.obs, pedido.cliente.cod];
                const retorno = await conexao.execute(sql, parametros);
                pedido.cod = retorno[0].insertId;
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

    async atualizar(pedido)
    {
        if (pedido instanceof Pedido) 
        {
            const conexao = await conectar();
            await conexao.beginTransaction();
            try
            {
                const sql = `UPDATE pedido SET ped_qtdItens = ?, ped_valTotal = ?,
                            ped_data = ?, ped_obs = ?, cli_cod = ? WHERE ped_cod = ?`;
                const parametros = [pedido.qtdItens, pedido.valTotal, pedido.data,
                                    pedido.obs, pedido.cliente.cod, pedido.cod];
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

    async excluir(pedido) 
    {
        if (pedido instanceof Pedido) 
        {
            const conexao = await conectar();
            await conexao.beginTransaction();
            try
            {
                const sql = 'DELETE FROM pedido WHERE ped_cod = ?';
                const parametros = [pedido.cod];
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
        if (!parametroConsulta)
        {
            parametroConsulta = "";
        }
        const conexao = await conectar();
        let listaPedidos = [];
        if (!isNaN(parseInt(parametroConsulta)))
        {
            const sql = `SELECT p.ped_cod, p.ped_qtdItens, p.ped_valTotal, 
                p.ped_data, p.ped_obs, p.cli_cod, c.cli_nome, c.cli_tel
                FROM pedido p INNER JOIN cliente c ON p.cli_cod = c.cli_cod 
                WHERE p.ped_cod = ?
                ORDER BY p.ped_cod`;
            const parametros = [parametroConsulta];
            const [registros] = await conexao.execute(sql, parametros);
            for (const registro of registros)
            {
                const cliente = new Cliente(registro.cli_cod, registro.cli_nome, registro.cli_tel);
                const pedido = new Pedido(registro.ped_cod,registro.ped_qtdItens,
                                          registro.ped_valTotal,registro.ped_data,
                                          registro.ped_obs, cliente);
                listaPedidos.push(pedido);
            }
        }
        else
        {
            const sql = `SELECT p.ped_cod, p.ped_qtdItens, p.ped_valTotal, 
                p.ped_data, p.ped_obs, p.cli_cod, c.cli_nome, c.cli_tel
                FROM pedido p INNER JOIN cliente c ON p.cli_cod = c.cli_cod 
                WHERE p.ped_valTotal like ?
                ORDER BY p.ped_cod`;
            const parametros=['%'+parametroConsulta+'%'];
            const [registros] = await conexao.execute(sql, parametros);
            for (const registro of registros)
            {
                const cliente = new Cliente(registro.cli_cod, registro.cli_nome, registro.cli_tel);
                const pedido = new Pedido(registro.ped_cod,registro.ped_qtdItens,
                                          registro.ped_valTotal,registro.ped_data,
                                          registro.ped_obs, cliente);
                listaPedidos.push(pedido);
            }
        }
        conexao.release();
        return listaPedidos;
    }
}
