/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.chains = this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let chains = {};

    for (let i = 0; i < this.words.length; i++) {

      let currWord = this.words[i];
      let nextWord = this.words[i + 1];

      if(!chains[currWord]){
        chains[currWord] = [];
      }

      if(nextWord){
        chains[currWord].push(nextWord);
      } else {
        chains[currWord].push(null);
      }
    }
    return chains;
  }

  /** return random text from chains */

  makeText(numWords = 100) {

    if(Object.keys(this.chains).length == 0 || numWords === 0){
      return ''
    }

    let result = [];

    const chains = this.chains

    // pick first word from chains keys
    let currWord = Object.keys(chains)[Math.floor(Math.random() * (Object.keys(chains).length))]
    result.push(currWord)

    while(result.length < numWords){
      // get word from current word values by random generated index
      let nextWord = chains[currWord][Math.floor(Math.random() * chains[currWord].length)]

      if(nextWord === null){
        return result.join(' ');
      } else {
        result.push(nextWord);
        currWord = nextWord;
      }
    }
    return result.join(' ')
  }
}

module.exports = { MarkovMachine }
