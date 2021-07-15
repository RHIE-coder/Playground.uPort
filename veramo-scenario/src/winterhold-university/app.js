const agentProvider = require("../ethr-registry-lib/agentProvider");
const StudentDidInfo = require("./entities/StudentDidInfo");

const student_DID = 'did:ethr:rinkeby:0x0381f1580f33d35b5b0de97393d2863dd353776169311db79cf971a0afafea012e'
const student_number = '202024600'
const student_name = 'dova'
const student_phone_number = '010-1234-5678'

const student_DID_publickKey = '0481f1580f33d35b5b0de97393d2863dd353776169311db79cf971a0afafea012e2b2fe473c5a79e5fa5c02cce301a1edbb644cf886bbf7be0034f32c3834947e5'

const univ_DID = 'did:ethr:rinkeby:0x022e90f6fe85b5778ffb9822df4258a9249bab828d078521b4e24745fbd057d189'
const univ_DID_publickKey = "042e90f6fe85b5778ffb9822df4258a9249bab828d078521b4e24745fbd057d189492f717ad0aa7ab46a09f2d9b8b7b170363bee715cdc4894502eea32b18cec5c"

async function saveStudentDid(){
    agentProvider.setupDB("issuer-local-db.sqlite", StudentDidInfo);

    const stuInfo = {
        did : student_DID,
        studentNo : student_number,
        studentName : student_name,
        studentPhoneNumber : student_phone_number
    }

    const connection = await agentProvider.getConnection()
    const stuRepo = connection.getRepository("StudentDidInfo")

    return stuRepo.save(stuInfo)
}

async function findStudentDid(){
    agentProvider.setupDB("issuer-local-db.sqlite", StudentDidInfo);

    const connection = await agentProvider.getConnection()
    const stuRepo = connection.getRepository("StudentDidInfo")

    return stuRepo.find();
}

async function invokeResolver(){
    agentProvider.setupDB("issuer-local-db.sqlite");
    const agent = await agentProvider.getAgent();
    const doc = await agent.resolveDid({
        didUrl: student_DID,
    });
    
    return doc;
}

async function issueVerifiableCredential(){
    agentProvider.setupDB("issuer-local-db.sqlite");
    const agent = await agentProvider.getAgent();

    const verifiableCredential = await agent.createVerifiableCredential({
        credential: {
            issuer : {id : univ_DID},
            credentialSubject: {
                id : student_DID,
                studentNumber : student_number,
                studentName : student_name,
                studentPhoneNumber: student_phone_number,
                status : 'graduated'
            }
        },
        proofFormat: 'jwt',
        save: false
    })

    return verifiableCredential;
}

async function main(){
    const exeOption = process.argv[2];

    if(!exeOption){
        throw new Error('the option is not exists');
    }

    agentProvider.setupDB("issuer-local-db.sqlite");
    const agent = await agentProvider.getAgent();

    switch(exeOption){
        case 'create-did':
            const identity = await agent.didManagerCreate()
            console.log(`New identity created`)
            console.log(identity)
            break;

        case 'check-did':
            console.log(`now check database`)
            const identifiers = await agent.didManagerFind();
            console.log(`There are ${identifiers.length} identifiers`);
            if (identifiers.length > 0) {
                identifiers.map((id) => {
                  console.log(id)
                  console.log('..................')
                })
            }
            break;

        case 'save-student-did':
            const savedInfo = await saveStudentDid()
            console.log("stuInfo has been saved: ", savedInfo);
            break;

        case 'find-student-did':
            const studentDidInfos = await findStudentDid();
            console.log(`There are ${studentDidInfos.length} studentDidInfos`);
            if (studentDidInfos.length > 0) {
                studentDidInfos.map((id) => {
                    console.log(id)
                    console.log('..................')
                })
            }
            break;

        case 'did-resolver':
            const doc = await invokeResolver();
            console.log(doc);
            break;
        
        case 'issue-vc':
            const vc = await issueVerifiableCredential();
            console.log(vc);
            break;

        default:
            throw new Error(`the option is not correct'`);
    }
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
