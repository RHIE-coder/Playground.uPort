const getRpcUrl = require("../ethr-registry-lib/agentProvider").getRpcUrl;
const didJWT = require('did-jwt')

const json = {
    credentialSubject: {
      studentNumber: '202024600',
      studentName: 'dova',
      studentPhoneNumber: '010-1234-5678',
      status: 'graduated',
      id: 'did:ethr:rinkeby:0x0381f1580f33d35b5b0de97393d2863dd353776169311db79cf971a0afafea012e'
    },
    issuer: {
      id: 'did:ethr:rinkeby:0x022e90f6fe85b5778ffb9822df4258a9249bab828d078521b4e24745fbd057d189'
    },
    type: [ 'VerifiableCredential' ],
    '@context': [ 'https://www.w3.org/2018/credentials/v1' ],
    issuanceDate: '2021-07-15T00:22:48.000Z',
    proof: {
      type: 'JwtProof2020',
      jwt: 'eyJhbGciOiJFUzI1NksiLCJ0eXAiOiJKV1QifQ.eyJ2YyI6eyJjcmVkZW50aWFsU3ViamVjdCI6eyJzdHVkZW50TnVtYmVyIjoiMjAyMDI0NjAwIiwic3R1ZGVudE5hbWUiOiJkb3ZhIiwic3R1ZGVudFBob25lTnVtYmVyIjoiMDEwLTEyMzQtNTY3OCIsInN0YXR1cyI6ImdyYWR1YXRlZCJ9LCJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIl19LCJzdWIiOiJkaWQ6ZXRocjpyaW5rZWJ5OjB4MDM4MWYxNTgwZjMzZDM1YjViMGRlOTczOTNkMjg2M2RkMzUzNzc2MTY5MzExZGI3OWNmOTcxYTBhZmFmZWEwMTJlIiwibmJmIjoxNjI2MzA4NTY4LCJpc3MiOiJkaWQ6ZXRocjpyaW5rZWJ5OjB4MDIyZTkwZjZmZTg1YjU3NzhmZmI5ODIyZGY0MjU4YTkyNDliYWI4MjhkMDc4NTIxYjRlMjQ3NDVmYmQwNTdkMTg5In0.w3G87tMTbQUpCcaY-tMJBvvwPKdqCNGNGHJh6pzxHuWzWONtUhISOd2HdmPA-8ZbPaoaqh2bU67CoiiZX72bjA'
    }
  }

const jwt = 'eyJhbGciOiJFUzI1NksiLCJ0eXAiOiJKV1QifQ.eyJ2YyI6eyJjcmVkZW50aWFsU3ViamVjdCI6eyJzdHVkZW50TnVtYmVyIjoiMjAyMDI0NjAwIiwic3R1ZGVudE5hbWUiOiJkb3ZhIiwic3R1ZGVudFBob25lTnVtYmVyIjoiMDEwLTEyMzQtNTY3OCIsInN0YXR1cyI6ImdyYWR1YXRlZCJ9LCJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIl19LCJzdWIiOiJkaWQ6ZXRocjpyaW5rZWJ5OjB4MDM4MWYxNTgwZjMzZDM1YjViMGRlOTczOTNkMjg2M2RkMzUzNzc2MTY5MzExZGI3OWNmOTcxYTBhZmFmZWEwMTJlIiwibmJmIjoxNjI2MzA4NTY4LCJpc3MiOiJkaWQ6ZXRocjpyaW5rZWJ5OjB4MDIyZTkwZjZmZTg1YjU3NzhmZmI5ODIyZGY0MjU4YTkyNDliYWI4MjhkMDc4NTIxYjRlMjQ3NDVmYmQwNTdkMTg5In0.w3G87tMTbQUpCcaY-tMJBvvwPKdqCNGNGHJh6pzxHuWzWONtUhISOd2HdmPA-8ZbPaoaqh2bU67CoiiZX72bjA'
  
async function test(){
    let decoded = didJWT.decodeJWT(jwt)
    console.log(JSON.stringify(decoded, null, 2))

    const Resolver = require('did-resolver')
    const ethrDid = require('ethr-did-resolver').getResolver({ rpcUrl: getRpcUrl() })
    console.log({ rpcUrl: getRpcUrl() })
    let resolver = new Resolver.Resolver(ethrDid)

    // pass the JWT from step 1
    let verificationResponse = await didJWT.verifyJWT(jwt, {
        resolver: resolver,
        audience: 'did:ethr:rinkeby:0x0381f1580f33d35b5b0de97393d2863dd353776169311db79cf971a0afafea012e'
    })
    console.log(verificationResponse)
}

test().catch(console.log)

