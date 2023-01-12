// const { ethers } = require("hardhat")
// const { expect, assert } = require("chai")
/*TYPESCRIPT*/
import { ethers } from "hardhat"
import { expect, assert } from "chai"
import { SimpleStorage, SimpleStorage__factory } from "../typechain-types"

/*TESTING OUR SOLIDITY CODE LOCALLY*/ //  mocha test
describe("SimpleStorage", function () {
    //declare the variables outside the "beforeEach" to let the function(it) intract with them
    let simpleStorageFactory: SimpleStorage__factory
    let simpleStorage: SimpleStorage
    // inside oure describe block
    beforeEach(async function () {
        simpleStorageFactory = (await ethers.getContractFactory(
            "SimpleStorage"
        )) as SimpleStorage__factory
        simpleStorage = await simpleStorageFactory.deploy()
    }) // beforeeach function is going to be some code to till us what to do before running the test
    // (it) where we wrtie the code for running our test
    it("Should start with a favorite number of 0", async function () {
        const currentValue = await simpleStorage.retrieve()
        const expectedValue = "0"
        // then we can use 2 keywords (expect, assert)
        assert.equal(currentValue.toString(), expectedValue)
        //expect(currentValue.toString()).to.equal(expectedValue)
    })
    // adding the (.only)keywrod to "it" to run a spesific test
    it("Should update when we call  store", async function () {
        const expectedValue = "7"
        const transactionResponse = await simpleStorage.store(expectedValue)
        await transactionResponse.wait(1)

        const currentValue = await simpleStorage.retrieve()
        assert.equal(currentValue.toString(), expectedValue)
    })
    /* we ca also hav "describe" inside the describe and has beforeeach and many it
  and it's helpfull for separating and modularizing our tests*/

    // Extra - this is not in the video
    // it("Should work correctly with the people struct and array", async function () {
    //     const expectedPersonName = "Patrick"
    //     const expectedFavoriteNumber = "16"
    //     const transactionResponse = await simpleStorage.addPerson(
    //         expectedPersonName,
    //         expectedFavoriteNumber
    //     )
    //     await transactionResponse.wait(1)
    //     const { favoriteNumber, name } = await simpleStorage.people(0)
    //     // We could also do it like this
    //     // const person = await simpleStorage.people(0)
    //     // const favNumber = person.favoriteNumber
    //     // const pName = person.name

    //     assert.equal(name, expectedPersonName)
    //     assert.equal(favoriteNumber, expectedFavoriteNumber)
    // })
})
