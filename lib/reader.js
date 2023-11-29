const readline = require('readline');
const fs = require('fs');

function createLineReader(filePath) {
  const fileStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  function onLine(callback) {
    rl.on('line', callback);
  }

  function onClose(callback) {
    rl.on('close', callback);
  }

  function close() {
    rl.close();
  }

  return {
    onLine,
    onClose,
    close
  };
}

module.exports = createLineReader;
