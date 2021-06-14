import { agent } from './veramo/setup'

async function main() {

  //didUrl 상황에 맞게 수정 필요
  const doc = await agent.resolveDid({
    didUrl: 'did:ethr:rinkeby:0x03ba1cf1fa7ebb6ea862ee2104423d3aa790e59e4d61dd487ea088108fca1a5dfa',
  });

  console.log(doc);
}

main().catch(console.log)