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