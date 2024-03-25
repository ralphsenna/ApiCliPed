import mysql from 'mysql2/promise';

export default async function conectar()
{
    const pool = mysql.createPool({
        host: '129.146.68.51',
        user: 'aluno28-pfsii2',
        password:'aluno28-pfsii2',
        database: 'exemplocliped',
        waitForConnections: true,
        connectionLimit: 10,
        maxIdle: 10,
        idleTimeout: 60000,
        queueLimit: 0,
        enableKeepAlive: true,
        keepAliveInitialDelay: 0
    });
    return await pool.getConnection();
}