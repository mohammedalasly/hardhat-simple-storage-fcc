// require("@nomicfoundation/hardhat-toolbox")
// require("dotenv").config() // import the file (.env) after install (dotenv)
// require("@nomiclabs/hardhat-etherscan") // add this plugin after we install it
// require("./scripts/tasks/block-number") // we import task in order to see it in hardhat list
// require("hardhat-gas-reporter") //install hardhat gas reporter to test how much gas each one of our functions cost
// require("solidity-coverage") // test what lines in our .sol aren't covered (tested)
/*TYPESCRIPT*/
import "@nomicfoundation/hardhat-toolbox"
import "dotenv/config"
import "@nomiclabs/hardhat-etherscan"
import "./scripts/tasks/block-number"
import "hardhat-gas-reporter"
import "solidity-coverage"
import "@typechain/hardhat"

/** @type import('hardhat/config').HardhatUserConfig */

// add  variables for our networks
const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL || "https://eth-goerli"
const PRIVATE_KEY = process.env.PRIVATE_KEY || "0xkey"
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "key"
const COINMARKETCAP_ABI_KEY = process.env.COINMARKETCAP_ABI_KEY || "key"
module.exports = {
    // adding networks
    defaultNetwork: "hardhat",
    networks: {
        goerli: {
            url: GOERLI_RPC_URL,
            accounts: [PRIVATE_KEY],
            chainId: 5,
        },
        localhost: {
            url: "http://127.0.0.1:8545/",
            //accounts: No need, because hardhat already gave us some, Thank U HH!
            chainId: 31337,
        },
    },
    solidity: "0.8.17",
    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
    },
    gasReporter: {
        // to have it run whenever we run our test
        enabled: true,
        outputFile: "gas-report.txt", // not to push it to github repo
        noColors: true, // WE add it because when we output to a file, colors ca get messed up
        currency: "USD", // to get the cost of each function  in USD for a blockchain like ETH
        coinmarketcap: COINMARKETCAP_ABI_KEY, // In order to get the currency, WE need to get an ABI key from COINMARKETCAP
        // hh gas reporter has different options if we gonna deploy to different network
        token: "MATIC", // Polygon network
    },
}
