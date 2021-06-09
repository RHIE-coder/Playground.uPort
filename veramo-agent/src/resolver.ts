import { agent } from './veramo/setup'

async function main() {

  //didUrl 상황에 맞게 수정 필요
  const doc = await agent.resolveDid({
    didUrl: 'did:ethr:rinkeby:0x03b6ffaacae6661b57b612083c17efeadc0cd42402b7c21fab0fbd3519a3403b50',
  });

  console.log(doc);
}

main().catch(console.log)