const getRpcUrl = require("./ethr-registry-lib/agentProvider").getRpcUrl;
const Resolver = require('did-resolver')
const ethrDid = require('ethr-did-resolver').getResolver({ rpcUrl: getRpcUrl(), name: 'rinkeby' })
const didJWT = require('did-jwt');
const fs = require('fs');

const univDID = 'did:ethr:rinkeby:0x022e90f6fe85b5778ffb9822df4258a9249bab828d078521b4e24745fbd057d189';
const stuDID = 'did:ethr:rinkeby:0x0381f1580f33d35b5b0de97393d2863dd353776169311db79cf971a0afafea012e';

function read(){
  return new Promise((resolve, reject)=>{
    fs.readFile('./winterhold-university/verifiableCredential.json', (err, data)=>{
      resolve(JSON.parse(data));
    })
  })
}

async function test(){

  const json = await read();
  
  const jwt = json.proof.jwt;

  const decoded = didJWT.decodeJWT(jwt)
  console.log(JSON.stringify(decoded, null, 2))

  console.log("-----------------------------------------")

  const resolver = new Resolver.Resolver(ethrDid)

  // pass the JWT from step 1
  const verificationResponseByUniv = await didJWT.verifyJWT(jwt, {
    resolver: resolver,
    audience: univDID
  })
  fs.writeFile('./Univ-VC.json', JSON.stringify(verificationResponseByUniv,null,2), err=>{
    console.log('success')
  })
  console.log(JSON.stringify(verificationResponseByUniv,null,2))

  const verificationResponseByStu = await didJWT.verifyJWT(jwt, {
    resolver: resolver,
    audience: stuDID
  })
  fs.writeFile('./Stu-VC.json', JSON.stringify(verificationResponseByStu,null,2), err=>{
    console.log('success')
  })
  console.log(JSON.stringify(verificationResponseByStu,null,2))
  
}

test().catch(console.log)

