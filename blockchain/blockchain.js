const Block = require("./block");

class BlockChain{
    constructor(){
        this.chain = [Block.Genesis()];
    }
    
    addBlock(data){
        const block = Block.mineBlock(this.chain[this.chain.length-1], data);
        this.chain.push(block);
        return block;
    }

    isChainValid(chain) {
        if (JSON.stringify(chain[0]) !== JSON.stringify(Block.Genesis())) return false;
        for (let i=1; i<chain.length; i++) {
          const block = chain[i];
          const lastBlock = chain[i-1];
          if (
            block.lastBlockHash !== lastBlock.thisBlockHash ||
            block.thisBlockHash !== Block.blockHash(block)
          ) {
            return false;
          }
        }
        return true;
      }

    replaceChain(newChain) {
        console.log(newChain);

        
        if (newChain.length <= this.chain.length) {
            console.log('Received chain is not longer than the current chain.');
            return;
        } else if (!this.isChainValid(newChain)) {
            console.log('The received chain is not valid.');
            return;
        }
        console.log('Replacing blockchain with the new chain.');
        this.chain = newChain;
    }
}

module.exports = BlockChain;