class AutoCompleteTrie{
    constructor(value = ''){
        this.value = value;
        this.children = {};
        this.endOfWord = false;
    }

    addWord(word){
        if (typeof word !== 'string' || !/^[a-zA-Z]+$/i.test(word)) return;
        word = word.toLowerCase();
        let node = this;
        for(const c of word){
            if(!this.children[c]){
                node.children[c] = new AutoCompleteTrie(c);
            }
            node = node.children[c];
        }
        node.endOfWord = true;
    }

    findWord(word){
        if (typeof word !== 'string' || !/^[a-zA-Z]+$/i.test(word)) return false;
        word = word.toLowerCase();
        let node = this;
        for(const c of word){
            if(!this.children[c]){
                return false;
            }
            node = node.children[c];
        }
        if(node.endOfWord == true){
            return true;
        }
        return false;

    }

    predictWords(prefix){

    }
}