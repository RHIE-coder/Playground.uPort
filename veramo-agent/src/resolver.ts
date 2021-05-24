import { agent } from './veramo/setup'

async function main() {

  //didUrl 상황에 맞게 수정 필요
  const doc = await agent.resolveDid({
    didUrl: 'did:ethr:rinkeby:0x020bcc200adf42b4652aafdcf935817821c073f5e48000482abf0fe53304bd2f1f',
  });

  console.log(doc);
}

main().catch(console.log)