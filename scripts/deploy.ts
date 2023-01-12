// imports on the top:
/* imoprting from hardhat / add "run" to run any (hardhat) task / add "network" to get network configuration*/
//const { ethers, run, network } = require("hardhat")
/*TYPE SCRIPT*/
import { ethers, run, network } from "hardhat"

// async main function:
async function main() {
    // get the contract factory:
    const SimpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    )
    console.log("Deploying contract...")
    const simpleStorage = await SimpleStorageFactory.deploy()
    await simpleStorage.deployed()
    console.log(`Deployed contract to: ${simpleStorage.address}`)

    // to verify on our testnet "Goerli"
    if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
        console.log("waiting for block txes...")
        await simpleStorage.deployTransaction.wait(6) // wait 6 blocks before verifying

        await verify(simpleStorage.address, []) // [] is the constructor argument
    }

    // Interacting with the contract:
    const currentValue = await simpleStorage.retrieve()
    console.log(`Current Value is: ${currentValue}`)

    // Update the current value:
    const transactionResponse = await simpleStorage.store(7)
    await transactionResponse.wait(1) // will wait one block for the transaction to go through
    const updatedValue = await simpleStorage.retrieve()
    console.log(`Updated Value is: ${updatedValue}`)
}
/* after we DEPLOYED our contract, we are going to create a new function to VERIFY it!!*/
// TYPESCRIPT: we add "string" to the first paramiter and "any []" to the arguments
async function verify(contractAddress: string, args: any[]) {
    /* Add code automatically verify our contract*/
    console.log("Verifying contract...")
    // add "try/catch on the "await" run the verification
    try {
        await run("verify:verify", {
            // this is an object contains the actuall parameters
            address: contractAddress,
            constructorArguments: args,
        })
    } catch (e: any) {
        if (e.message.toLowerCase().include("already verified")) {
            console.log("Already Verified!")
        } else {
            console.log(e)
        }
    }
}
// call the main function:
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
