export default class AutoCompleteTrie {
  constructor(value = "") {
    this.value = value;
    this.children = {};
    this.endOfWord = false;
  }

  addWord(word) {
    if (word === "") return { message: "Cannot add empty word", type: "fail" };
    if (typeof word !== "string" || !/^[a-z]+$/i.test(word))
      return { message: `'${word}' is not Valid`, type: "fail" };

    let node = this;
    for (const ch of word) {
      if (!node.children[ch]) {
        node.children[ch] = new AutoCompleteTrie(ch);
      }
      node = node.children[ch];
    }
    if (node.endOfWord) {
      return { message: `'${word}' is already in dictionary`, type: "info" };
    }
    node.endOfWord = true;
    return { message: `Added '${word}' to dictionary`, type: "success" };
  }

  findWord(word) {
    if (typeof word !== "string" || !/^[a-z]+$/i.test(word)) return false;

    let node = this;
    for (const ch of word) {
      node = node.children[ch];
      if (!node) return false;
    }
    return node.endOfWord;
  }

  predictWords(prefix) {
    if (typeof prefix !== "string" || !/^[a-z]+$/i.test(prefix)) return [];

    const start = this._getRemainingTree(prefix, this);
    if (!start) return [];

    const words = [];
    this._allWordsHelper(prefix, start, words);
    return words;
  }

  _getRemainingTree(prefix, node) {
    for (const ch of prefix) {
      node = node.children[ch];
      if (!node) return null;
    }
    return node;
  }

  _allWordsHelper(prefix, node, words) {
    if (node.endOfWord) words.push(prefix);
    for (const [ch, child] of Object.entries(node.children)) {
      this._allWordsHelper(prefix + ch, child, words);
    }
  }
}
