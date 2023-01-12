// To use the current block number or whatever blockchain we are working with
/*First, we import the task function*/
//const { task } = require("hardhat/config") // hardhat config has the "task" function
/*TYPESCRIPT*/
import { task } from "hardhat/config"

/*define "task"*/
//give it a name and a description, then we set action and define what we want to do
// (TYPESCRIPT)adding "export default" to our "task" function
export default task(
    "block-number",
    "Prints the current block number"
).setAction(async (taskArgs, hre) => {
    const blockNumber = await hre.ethers.provider.getBlockNumber()
    console.log(`Current block number: ${blockNumber}`) // then we import task in hardhat.config.js
})
//module.exports = {}
