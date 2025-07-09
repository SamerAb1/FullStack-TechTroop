let studentScores = [92, 87, 76, 95, 88, 72, 91, 83, 79, 96, 85, 74, 89, 93, 81]

let scores = studentScores.reduce((score, studentScores) =>{
    let grade = (studentScores > 89 ? "A" : (studentScores > 79 ? "B" : (studentScores > 69 ? "C" : "F")));
    score[grade] = (score[grade] || 0) + 1;
    return score;
}, {A: 0, B: 0, C: 0, F: 0});
console.log(scores);