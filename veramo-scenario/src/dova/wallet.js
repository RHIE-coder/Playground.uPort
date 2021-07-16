const agentProvider = require("../ethr-registry-lib/agentProvider");
const fs = require('fs')

const student_DID = 'did:ethr:rinkeby:0x0381f1580f33d35b5b0de97393d2863dd353776169311db79cf971a0afafea012e'

function read(){
    return new Promise((resolve, reject)=>{
      fs.readFile('./verifiableCredential.json', (err, data)=>{
        resolve(JSON.parse(data));
      })
    })
  }

async function main(){
    const exeOption = process.argv[2];

    if(!exeOption){
        throw new Error('the option is not exists');
    }

    if(exeOption !== 'create-did' && exeOption !== 'check-did' && exeOption !== 'make-vp'){
        throw new Error(`the option should be 'create-did' or 'check-did' or 'make-vp'`);
    }

    agentProvider.setupDB("holder-local-db.sqlite");
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

        case 'make-vp':
            const vc = await read();

            const verifiablePresentation = await agent.createVerifiablePresentation({
                presentation:{
                  // id?: string | undefined;
                  holder: student_DID,
                  // issuanceDate?: string | undefined;
                  // expirationDate?: string | undefined;
                  // '@context'?: string[] | undefined;
                  // type?: string[] | undefined;
                  verifier: ["Ajou Corp."],
                  verifiableCredential: [vc]
                },
                proofFormat: 'jwt',
                save: false
            })
            fs.writeFile('../ajouCorp/verifiablePresentation.json', JSON.stringify(verifiablePresentation,null,2), err=>{
                console.log('success')
              })
            break;
    }
}


main().catch(console.log)

