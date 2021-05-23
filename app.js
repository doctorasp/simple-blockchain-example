const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;

const Blockchain = require('./block-chain/chain');
const Block = require('./block-chain/block');



const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');

  let MyFirstCoin = new Blockchain();

  let block1=new Block(1, '01/01/2017', {amount:5});

  let block2=new Block(2, '01/01/2018', {amount:7});

  let block3=new Block(2, '01/01/2018', {amount:10});

  MyFirstCoin.addBlock(block1);
  MyFirstCoin.addBlock(block2);
  MyFirstCoin.addBlock(block3);

  console.log(MyFirstCoin.getAllBlock());

  res.end(MyFirstCoin.getAllBlock().toString());

});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});