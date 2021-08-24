import { agent } from './veramo/setup'

async function main() {
  const verifiableCredential = await agent.createVerifiableCredential({
      credential: {
          issuer : {id : 'did:ethr:rinkeby:0x03ba1cf1fa7ebb6ea862ee2104423d3aa790e59e4d61dd487ea088108fca1a5dfa'},
          credentialSubject: {
              name : 'alice',
              gender: 'male',
              age: 25
          }
      },
      proofFormat: 'jwt',
      save: false
  })

  console.log("=============== VC ===============") 
  console.log(verifiableCredential);

  const verifiablePresentation = await agent.createVerifiablePresentation({
      presentation:{
        // id?: string | undefined;
        holder: 'did:ethr:rinkeby:0x020bcc200adf42b4652aafdcf935817821c073f5e48000482abf0fe53304bd2f1f',
        // issuanceDate?: string | undefined;
        // expirationDate?: string | undefined;
        // '@context'?: string[] | undefined;
        // type?: string[] | undefined;
        verifier: ["UPORT Corp."],
        verifiableCredential: [verifiableCredential]
      },
      proofFormat: 'jwt',
      save: false
  })

  console.log("=============== VP ===============") 
  console.log(verifiablePresentation);
}

main().catch(console.log)