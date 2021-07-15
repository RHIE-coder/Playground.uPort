const { createConnection } = require("typeorm");

const agentProvider = require("../ethr-registry-lib/agentProvider");

const StudentDidInfo = require("./entities/StudentDidInfo");

// agentProvider.getAgent("issuer-local-db.sqlite").then(agent=>{
//     const identity = agent.didManagerCreate()
//     console.log(`New identity created`)
//     console.log(identity)
//     return dbConnection
// }).then(dbConnection => {
//     console.log(dbConnection.getRepository())
// })

const dbConnection = createConnection({
    type: 'sqlite',
    database: "issuer-local-db.sqlite",
    synchronize: true,
    logging: ['error', 'info', 'warn'],
    entities: [...agentProvider.Entities],
});

// dbConnection.then((connection)=>{
//     return connection.getRepository("Identifier")
//     // return connection.getRepository("Key")
// }).then(repo=>{
//     return repo.find();
// }).then(console.log);



async function main(){
    await agentProvider.setupDB("issuer-local-db.sqlite", StudentDidInfo);
    const agent = await agentProvider.getAgent();
    const identifiers = await agent.didManagerFind();
    console.log(`There are ${identifiers.length} identifiers`);
    if (identifiers.length > 0) {
        identifiers.map((id) => {
          console.log(id)
          console.log('..................')
        })
    }

    const stuInfo = {
        did : 'did:ethr:rinkeby:0x02ac02a20c94a19c905fa85b2323257262644ccc5051406c5394dca4caa99441d7',
        studentNo : '202024600',
        studentName : 'rhie',
        studentPhoneNumber : '010-1234-5678'
    }

    const connection = await agentProvider.getConnection()
    const stuRepo = connection.getRepository("StudentDidInfo")
    stuRepo.save(stuInfo)
    .then(function(saveStu) {
        console.log("stuInfo has been saved: ", saveStu);
        console.log("Now lets load all posts: ");

        return stuRepo.find();
    })
    .then(function(allStu) {
        console.log("All Students: ", allStu);
    });
}

main().catch(console.log)

// const express = require('express');
// const app = express();
// const path = require('path');
// const multer = require('multer');
// const mongoose = require('mongoose');
// const { Schema } = require('mongoose');
// const cookieParser = require('cookie-parser');
// const expressSession = require('express-session');
// const port = 3000;

// app.use('/static', express.static(path.join(__dirname, 'public')));
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// app.use(cookieParser());

// app.use(expressSession({
//   secret:"my secret key",
//   resave: true,
//   saveUninitialized: true
// }));

// app.all('*', (req,res)=>{
//   res.status(404).send("<h1>페이지 없음</h1>");
// });

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`)
// })

// dbConnection.then(connection=>{
//     return connection.getRepository("Key")
// }).then(repo=>{
//     return repo.findOne({kid: '0445b9df6db7d370b6dcd7a8dd46923937df392831ee17465555e58c2fedef0891c4537debaf4016ad0e65407008d3892f25d18502a9d4d0e4aa0e8b5e492e4354'});
// }).then(console.log);



// agentProvider.getAgent("issuer-local-db.sqlite").then(agent=>{
//     const identity = agent.didManagerCreate()
//     console.log(`New identity created`)
//     console.log(identity)
//     return dbConnection
// }).then(dbConnection => {
//     console.log(dbConnection.getRepository())
// })


