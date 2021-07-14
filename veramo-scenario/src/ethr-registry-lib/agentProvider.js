/****************************
 ****** veramo modules ******
 ****************************/

// Core interfaces
const { createAgent, IDIDManager, IResolver, IDataStore, IKeyManager } = require('@veramo/core');

// Core identity manager plugin
const { DIDManager } = require('@veramo/did-manager');

// Ethr did identity provider
const { EthrDIDProvider } = require('@veramo/did-provider-ethr');

// Web did identity provider
const { WebDIDProvider } = require('@veramo/did-provider-web');

// Core key manager plugin
const { KeyManager, AbstractSecretBox } = require('@veramo/key-manager');

// Custom key management system for RN
const { KeyManagementSystem } = require('@veramo/kms-local');

// Custom resolvers
const { DIDResolverPlugin } = require('@veramo/did-resolver');
const { Resolver } = require('did-resolver');
const ethrDidResolver = require('ethr-did-resolver').getResolver;
const webDidResolver = require('web-did-resolver').getResolver;

// Storage plugin using TypeOrm
const { Entities, KeyStore, DIDStore, IDataStoreORM } = require('@veramo/data-store');

// TypeORM is installed with `@veramo/data-store`
const { createConnection } = require('typeorm');

const { CredentialIssuer, ICredentialIssuer } = require('@veramo/credential-w3c');

// to protect the project id
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.join(__dirname, '../../.env') })

// You will need to get a project ID from infura https://www.infura.io
const INFURA_PROJECT_ID = process.env.INFURA_PROJECT_ID

let dbConnection;

function setupDB(database_file, extend_entity){
    // This will be the name for the local sqlite database for demo purposes
    const DATABASE_FILE = database_file;

    if(extend_entity){
        Entities.push(extend_entity)
    }

    console.log(Entities)

    dbConnection = createConnection({
        type: 'sqlite',
        database: DATABASE_FILE,
        synchronize: true,
        logging: ['error', 'info', 'warn'],
        entities: Entities, //[Key, Identifier, Message, Claim, Credential, Presentation, Service]
    });
    
}

function getConnection(){
    return dbConnection;
}


function getAgent(){

    return new Promise((resolve,reject) => {
        
        const agent = createAgent({
            plugins: [
                new KeyManager({
                //Please provide SecretBox to the KeyStore
                //--> store: new KeyStore(dbConnection,new SecretBox())
                store: new KeyStore(dbConnection),
                kms: {
                    local: new KeyManagementSystem(),
                },
                }),
                new DIDManager({
                store: new DIDStore(dbConnection),
                defaultProvider: 'did:ethr:rinkeby',
                providers: {
                    'did:ethr:rinkeby': new EthrDIDProvider({
                    defaultKms: 'local',
                    network: 'rinkeby',
                    rpcUrl: 'https://rinkeby.infura.io/v3/' + INFURA_PROJECT_ID,
                    }),
                    'did:web': new WebDIDProvider({
                    defaultKms: 'local',
                    }),
                },
                }),
                new DIDResolverPlugin({
                resolver: new Resolver({
                    ...ethrDidResolver({ infuraProjectId: INFURA_PROJECT_ID }),
                    ...webDidResolver(),
                }),
                }),
                new CredentialIssuer(),
            ],
        });
        

        if(agent){
            resolve(agent);
        }else{
            reject("fail to get agent");
        }
    })
    
}

module.exports.getAgent = getAgent;
module.exports.Entities = Entities;
module.exports.setupDB = setupDB;
module.exports.getConnection = getConnection;

/*****************************
 ****** server sections ******
 *****************************/
// const express = require('express');
// const app = express();
// const path = require('path');
// const port = 3000;

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// app.all('*', (req,res)=>{
//   res.status(404).send("<h1>페이지 없음</h1>");
// });

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`)
// })