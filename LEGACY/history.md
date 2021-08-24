# Veramo

## - My Guide

### * node 설치와 yarn 설치 필요

node.js 설치 후 yarn 설치는 아래와 같이

```cmd
npm install -g yarn
```

### * infura 계정 생성 및 프로젝트 생성(Ethereum) 필요

https://infura.io/

### * 프로젝트 셋팅

#### step 01. create directory

```cmd
mkdir veramo-agent && cd veramo-agent
yarn init -y
```

#### step 02. yarn add

```cmd
yarn add typescript ts-node --dev
```

#### step 03. install veramo plugins

```cmd
yarn add @veramo/core @veramo/credential-w3c @veramo/data-store @veramo/did-manager @veramo/did-provider-ethr @veramo/did-provider-web @veramo/did-resolver @veramo/key-manager @veramo/kms-local ethr-did-resolver web-did-resolver
```

#### step 04. install sqlite

```cmd
yarn add sqlite3
```

#### step 05. tsconfig.json

```
{
  "compilerOptions": {
    "preserveConstEnums": true,
    "strict": true,
    "target": "es6",
    "rootDir": "./",
    "moduleResolution": "node",
    "esModuleInterop": true,
    "downlevelIteration": true
  }
}
```

### * `.env`파일 필요

`veramo-agent/`경로에 파일 생성 후 아래와 같이 내용채우기

```cmd
INFURA_PROJECT_ID=이곳에 당신의 프로젝트 입력 ID, 쌍따옴표 같은 것은 필요없음
```

<br><br><br><br><br>
<hr>
<br><br><br><br><br>

## - trouble shooting

### * `Error: Cannot find module '@types/node/package.json'`

#### solved

```cmd
npm install --save @types/node
```
```cmd
npm install
```

<br><br><br><br><br>
<hr>
<br><br><br><br><br>

## - ref link

 - serto

https://www.serto.id/

 - veramo

https://veramo.io/

 - infura 아키텍처

https://medium.com/@sungjoon.yoon/infura-%EC%82%AC%EC%9A%A9%ED%95%B4%EB%B3%B4%EA%B8%B0-24af9bf12c4c

 - infura Ethereum API

https://blog.infura.io/getting-started-with-infuras-ethereum-api/

 - infura 문서

https://infura.io/docs/ethereum

 - Etherscan
 
 https://www.rinkeby.io/#explorer

`0xdca7ef03e98e0dc2b855be647c39abe984fcf21b`

<br><br><br><br><br>
<hr>
<br><br><br><br><br>

## - attention

infura.io에서 이더리움 2.0 프로젝트 지원이 보인다. 이더리움 2.0 프로젝트가 어떻게 되어가고 있는 것인지 이건 알아봐야 함.

 --> 아직이다. 이더리움 2.0이 나타나면 바로 구현하려는 듯 보인다.

credential과 presentation은 어떻게?

 --> 완료

# 중대한 에러 DID Document에 services 추가

veramo.io의 API 및 Plugins 가이드에 따라 진행

```ts
import { agent } from './veramo/setup'

async function main() {
  const option = {
    did: "did:ethr:rinkeby:0x03ba1cf1fa7ebb6ea862ee2104423d3aa790e59e4d61dd487ea088108fca1a5dfa",
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
```

 - 에러 내용

```
Error: invalid signer or provider (argument="signerOrProvider", value={"options":{},"timeout":0,"provider":{"host":"https://rinkeby.infura.io/v3/[본 항목은 비공개]","timeout":0},"rpc":{"options":{"jsonSpace":0,"max":9999999999999},"idCounter":1169372751410,"currentProvider":{"host":"https://rinkeby.infura.io/v3/[본 항목은 비공개]","timeout":0}}}, code=INVALID_ARGUMENT, version=contracts/5.2.0)
    at Logger.makeError (C:\Users\quoti\Desktop\LocalRepo\__PROGRAMMING__\CodeCloud\UPort\veramo-agent\node_modules\@ethersproject\logger\src.ts\index.ts:213:28)
    at Logger.throwError (C:\Users\quoti\Desktop\LocalRepo\__PROGRAMMING__\CodeCloud\UPort\veramo-agent\node_modules\@ethersproject\logger\src.ts\index.ts:225:20)
    at Logger.throwArgumentError (C:\Users\quoti\Desktop\LocalRepo\__PROGRAMMING__\CodeCloud\UPort\veramo-agent\node_modules\@ethersproject\logger\src.ts\index.ts:229:21)
    at Contract.BaseContract (C:\Users\quoti\Desktop\LocalRepo\__PROGRAMMING__\CodeCloud\UPort\veramo-agent\node_modules\@ethersproject\contracts\src.ts\index.ts:633:20)
    at new Contract (C:\Users\quoti\Desktop\LocalRepo\__PROGRAMMING__\CodeCloud\UPort\veramo-agent\node_modules\@ethersproject\contracts\lib\index.js:1017:42)
    at Contract.fromSolidity [as connect] (C:\Users\quoti\Desktop\LocalRepo\__PROGRAMMING__\CodeCloud\UPort\veramo-agent\node_modules\@ethersproject\contracts\src.ts\index.ts:841:26)
    at P (C:\Users\quoti\Desktop\LocalRepo\__PROGRAMMING__\CodeCloud\UPort\veramo-agent\node_modules\ethr-did\node_modules\ethr-did-resolver\src\configuration.ts:68:46)
    at new K (C:\Users\quoti\Desktop\LocalRepo\__PROGRAMMING__\CodeCloud\UPort\veramo-agent\node_modules\ethr-did\node_modules\ethr-did-resolver\src\controller.ts:46:23)
    at new o (C:\Users\quoti\Desktop\LocalRepo\__PROGRAMMING__\CodeCloud\UPort\veramo-agent\node_modules\ethr-did\src\index.ts:64:25)
    at EthrDIDProvider.<anonymous> (C:\Users\quoti\Desktop\LocalRepo\__PROGRAMMING__\CodeCloud\UPort\veramo-agent\node_modules\@veramo\did-provider-ethr\src\ethr-did-provider.ts:124:21)
```

stacktrace를 따라서 모든 소스코드 분석을 해보아도 무엇이 문제인지 모르겠음.

그래서 did나 id 프로퍼티의 서식이 잘못되었나 싶어서 일부로 DID를 틀리게적어 요청해봄

```ts
import { agent } from './veramo/setup'

async function main() {
  const option = {
    // did: "did:ethr:rinkeby:0x03ba1cf1fa7ebb6ea862ee2104423d3aa790e59e4d61dd487ea088108fca1a5dfa",
    did: "did:ethr:rinkeby:0x03ba1cf1fa7ebb6ea862ee2104423d3aa790e59e4d61dd487ea088108fca1a", //틀리게 적음
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
```

 - 에러 내용

```
Error: Identifier not found
    at DIDStore.<anonymous> (C:\Users\quoti\Desktop\LocalRepo\__PROGRAMMING__\CodeCloud\UPort\veramo-agent\node_modules\@veramo\data-store\src\identifier\did-store.ts:39:28)
    at Generator.next (<anonymous>)
    at fulfilled (C:\Users\quoti\Desktop\LocalRepo\__PROGRAMMING__\CodeCloud\UPort\veramo-agent\node_modules\@veramo\data-store\build\identifier\did-store.js:5:58)
```

즉, 존재한 DID로 인식했고 그 뒤에 에러가 난것으로 예상된다.

Veramo에서 아직 구현을 덜한 것으로 추측. 

왜냐 하면, 잘 실행되는 다른 API와 다르게 해당 API에 Description 및 예제 코드가 존재하지 않는다.