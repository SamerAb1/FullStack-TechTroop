class AutoCompleteTrie{
    constructor(value = ''){
        this.value = value;
        this.children = {};
        this.endOfWord = false;
    }

    addWord(word){
        if (typeof word !== 'string' || !/^[a-zA-Z]+$/i.test(word)) return false;
        word = word.toLowerCase();
        let node = this;
        for(const ch of word){
            if(!this.children[ch]){
                node.children[ch] = new AutoCompleteTrie(ch);
            }
            node = node.children[ch];
        }
        node.endOfWord = true;
        return true;
    }

    findWord(word){
        if (typeof word !== 'string' || !/^[a-zA-Z]+$/i.test(word)) return false;
        word = word.toLowerCase();
        let node = this;
        for(const ch of word){
            node = node.children[ch];
            if(!node) return false;
        }
        return node.endOfWord;
    }

    predictWords(prefix){
        if (typeof prefix !== 'string' || !/^[a-z]+$/i.test(prefix)) return false;
        prefix = prefix.toLowerCase();

        const start = this._getRemainingTree(prefix,this);
        if(!start) return false;
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

    _allWordsHelper(prefix, node, words){
        if(node.endOfWord) words.push(prefix);
        for(const [ch, child] of Object.entries(node.children)) {
            this._allWordsHelper(prefix + ch, child, words);
        }
    }
}

module.exports = AutoCompleteTrie;