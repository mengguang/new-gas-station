const express = require('express')
const ethers = require("ethers");
const app = express()
const port = 3000

/**
 * {
   "fast":50.0,
   "fastest":200.0,
   "safeLow":10.0,
   "average":20.0,
   "block_time":13.942307692307692,
   "blockNum":7403346,
   "speed":0.7090284960673774,
   "safeLowWait":13.4,
   "avgWait":1.8,
   "fastWait":0.5,
   "fastestWait":0.5
 * }
 */

async function generate_gas_info(rpc_url) {
    const provider = new ethers.providers.JsonRpcProvider(rpc_url);
    const blockNumber = await provider.getBlockNumber();
    const gasPrice = await provider.getGasPrice();
    const generalGasPrice = gasPrice.div(100000000).toNumber();
    return {
        fast: generalGasPrice,
        fastest: generalGasPrice,
        safeLow: generalGasPrice,
        average: generalGasPrice,
        block_time: 3,
        blockNum: blockNumber,
        speed: 1,
        safeLowWait: 0.5,
        avgWait: 0.5,
        fastWait: 0.5,
        fastestWait: 0.5,
    };
}

app.get('/json/main/new-gas-api.json', async (req, res, next) => {
    try {
        const rpc_url = "https://cn.rpc.mainnet.diynova.com";
        const response = await generate_gas_info(rpc_url);
        res.json(response);
    } catch (error) {
        return next(error)
    }
})

app.get('/json/test/new-gas-api.json', async (req, res, next) => {
    try {
        const rpc_url = "https://rpc6.newchain.cloud.diynova.com";
        const response = await generate_gas_info(rpc_url);
        res.json(response);
    } catch (error) {
        return next(error)
    }
})

app.listen(port, () => {
    console.log(`new-gas-api listening at port: ${port}`)
})
