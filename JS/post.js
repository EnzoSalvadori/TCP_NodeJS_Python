const { Pool, Client } = require('pg')

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'Arroz',
    password: 'ozne1711',
    port: 5432,
  })

  client.connect()

  client.query('SELECT * FROM analise', (err, res) => {
    console.log(res.rows[0])
    client.end()
  })
  