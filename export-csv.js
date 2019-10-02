//https://www.mockaroo.com

const mysql = require('mysql')
const db = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'cadastro'
}
const conn = mysql.createConnection(db)

conn.connect((err)=>{
    if(err)
        console.log(err)
})

const sql = 'select id, nome from pessoas'

// conn.query(sql, (err, results)=>{
//     if(err) console.log(err)
//     else console.log(results)
// })

const fs = require('fs')
//cria um stream de dados para fluxos de dados grandes
const writable = fs.createWriteStream('pessoas.csv')

writable.write('id; nome\n')

const query = conn.query(sql)
query.on('result', row => {
    // console.log(row)

    conn.pause() //pausa um pokinho porque tá
    //escrevendo muito rapido no arquivo
    const data = row.id+';'+row.nome+'\n'
    writable.write(data, ()=>{
        conn.resume()
        // pode-se abrir duas conexoes e gravar os dados
        //vindos de uma na outra, com pause e resume pra
        //nao vir mais dados na conexao enquanto esses 
        //nao foram transferidos.
        // console.log('written')
    })
})

query.on('end', ()=>{
    writable.end((err)=>{
        if(err) console.log(err)
    })
    conn.end((err)=>{
        if(err) console.log(err)
    })
    console.log('fim')
})
console.log('antes de tudo')

// conn.end((err)=>{
//     console.log(err)
// })

