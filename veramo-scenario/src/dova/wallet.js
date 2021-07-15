const agentProvider = require("../ethr-registry-lib/agentProvider");

async function main(){
    const exeOption = process.argv[2];

    if(!exeOption){
        throw new Error('the option is not exists');
    }

    if(exeOption !== 'create-did' && exeOption !== 'check-did'){
        throw new Error(`the option should be 'create-did' or 'check-did'`);
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
    }
}


main().catch(console.log)

