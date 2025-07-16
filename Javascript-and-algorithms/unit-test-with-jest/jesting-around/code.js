class PictureManager {
    constructor() {
        this.pictureURLs = []
    }

    addPicture(picURL) {
        this.pictureURLs.push(picURL)
    }

    removePicture(picURL) {
        this.pictureURLs.splice(this.pictureURLs.indexOf(picURL), 1)
    }
}

module.exports = PictureManager


const add = function(a, b){
    return a + b
}
const calculateHyp = function(a,b) {
    return (Math.sqrt((a**2) + (b **2)));
}

const removeBugs = function (code) {
    return code.map(c => c != "BUG")
}
const clearLowPriority = function (array){
    let newArray = array.filter(obj => obj.priority == "HIGH");
    return newArray;
}

module.exports = {add, calculateHyp, clearLowPriority};

