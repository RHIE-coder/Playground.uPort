import { agent } from './veramo/setup'

async function main() {
  const option = {
    // did: "did:ethr:rinkeby:0x03ba1cf1fa7ebb6ea862ee2104423d3aa790e59e4d61dd487ea088108fca1a5dfa",
    did: "did:ethr:rinkeby:0x03ba1cf1fa7ebb6ea862ee2104423d3aa790e59e4d61dd487ea088108fca1a",
    service:{
        description: "alummi",
        id: "did:ethr:rinkeby:0x03ba1cf1fa7ebb6ea862ee2104423d3aa790e59e4d61dd487ea088108fca1a5dfa#prove",
        type: "prove",
        serviceEndpoint:"www.example.com"
    }
  }
  const identity = await agent.didManagerAddService(option);
  console.log(`New identity created`)
  console.log(identity)
}

main().catch(err=>{
    console.log("---fail---")
    console.log(err);
});