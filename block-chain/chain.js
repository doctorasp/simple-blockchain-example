const Block =require('./block');

class Blockchain{

    constructor(){
        this.chain=[this.createGenesisBlock()];
    }

    createGenesisBlock(){
        return new Block('0',"01/01/2017",'Genesis block','0');
    }

    getAllBlock(){
        let str = '';

        for(let i=0;i<this.chain.length;i++){
            if(i==0){
                str+='Genesis block:\n'
            }
            str+= '\nIndex:'+this.chain[i].index+'\nTimestamp:'+
            this.chain[i].timestamp+'\nCoin amount:'+
            this.chain[i].data.amount+'\nPrevHash:'+
            this.chain[i].previousHash+'\nOwnHash:'+
            this.chain[i].hash+'\n';
        }

        return str.toString();
    }

    getLatestBlock(){
        return this.chain[this.chain.length-1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculatedHash();
        this.chain.push(newBlock);
    }

    isChainValid(){
        for(let i = 1;i<this.chain.length;i++){

            const currentBlock = this.chain[i];
            const prevBlock = this.chain[i-1];

            if(currentBlock.previousHash!==prevBlock.hash){
                return false;
            }

            if(currentBlock.hash!==currentBlock.calculatedHash()){
                return false;
            }
            
            if(currentBlock.previousHash!==prevBlock.calculatedHash()){
                return false;
            }
        }
        
        return true;
    }
}

module.exports = Blockchain;