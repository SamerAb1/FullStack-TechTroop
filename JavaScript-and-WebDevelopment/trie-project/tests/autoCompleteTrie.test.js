const AutoCompleteTrie = require('../autoCompleteTrie');

describe('AutoCompleteTrie', () => {
  let trie;
  beforeEach(() => {
    trie = new AutoCompleteTrie();
  });

  test('addWord returns true and marks endOfWord', () => {
    expect(trie.addWord('cat')).toBe(true);
    expect(trie.findWord('cat')).toBe(true);
  });

  test('reuses existing path (run / running)', () => {
    trie.addWord('run');
    trie.addWord('running');
    expect(trie.findWord('run')).toBe(true);
    expect(trie.findWord('running')).toBe(true);
    expect(trie.findWord('runn')).toBe(false); // not a full word
  });

  test('case-insensitive add/find', () => {
    trie.addWord('car');
    expect(trie.findWord('car')).toBe(true);
    expect(trie.findWord('cat')).toBe(false);
    expect(trie.findWord('')).toBe(false);
  });

  test('predictWords returns all words with prefix', () => {
    ['cat', 'car', 'card', 'care', 'dog'].forEach(w => trie.addWord(w));
    const result = trie.predictWords('ca').sort();
    expect(result).toEqual(['car', 'card', 'care', 'cat'].sort());
  });

  test('predictWords returns [] if prefix not found', () => {
    trie.addWord('hello');
    expect(trie.predictWords('x')).toEqual([]);
  });

  test('invalid inputs return false/[]', () => {
    expect(trie.addWord('123')).toBe(false);
    expect(trie.findWord('!!!')).toBe(false);
    expect(trie.predictWords('$$$')).toEqual([]);
  });
});
