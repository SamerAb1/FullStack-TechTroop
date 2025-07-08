const story = "In the beginning there was light. Then there were wolves. Finally there was a big fire. Ultimately, Shelob the wolf-master put out the fire with her feet. But until then, the fire caused one heck of a lot of damage."
const specialChars = [",", ".", "'", '"', "?", "!", ";"]
const wordCounts = {}


const cleanText = function(sentence){
    sentence = sentence.toLowerCase();
    sentence =  removeSpecialChars(sentence);
    return sentence.split(" ");
}

const removeSpecialChars = function(sentence){
    for(c of specialChars){
        sentence =  sentence.split(c).join(" ");
    }
    return sentence;

}

const addToCounter = function(word){
    wordCounts[word] ? wordCounts[word]++ : wordCounts[word] = 1;
}

const countWords = function(sentence){
    let splitstory = cleanText(sentence);
    for(word of splitstory){
        addToCounter(word);
    }
}

countWords(story);
console.log(wordCounts);