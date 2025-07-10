const StringFormatter = function () {
    const capitalizeFirst = function (str){
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }
    const toSkewerCase = function(str) {
        return str.replace(" ", "-");
    }
    return {
        capitalizeFirst: capitalizeFirst,
        toSkewerCase : toSkewerCase
    }
}


const formatter = StringFormatter()

formatter.capitalizeFirst("dorothy") //should return Dorothy
formatter.toSkewerCase("blue box") //should return blue-box
console.log(formatter.capitalizeFirst("dorothy"))
console.log(formatter.toSkewerCase("blue box"))