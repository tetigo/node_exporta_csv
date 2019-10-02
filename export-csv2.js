const mysql = require('mysql')
const db = {
    host:'localhost',
    user:'root',
    password:'',
    database: 'cadastro'
}
const conn = mysql.createConnection(db)

conn.connect((err)=>{
    if(!err){
        const fs = require('fs')
        const writable = fs.createWriteStream('lixo.txt')
        writable.write('id;nome\n')
        const sql = 'select * from pessoas'
        const query = conn.query(sql)
        query.on('result',(row)=>{
            conn.pause()
            const data = `${row.id};${row.nome}\n`
            writable.write(data,(error)=>{
                conn.resume()
            })
            // console.log(row)
        })
        // conn.query(sql,(err, results)=>{
        //     if(!err){
        //         console.log(results)
        //     }
        // })
        query.on('end', ()=>{
            writable.end()
            conn.end()
            console.log('fim')

        })
    }
})

