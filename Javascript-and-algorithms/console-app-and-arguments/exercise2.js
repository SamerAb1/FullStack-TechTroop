// Exercise 2

import promptSync from 'prompt-sync';
const prompt = promptSync();

const q1 = prompt("What is 2 + 2?");
const q2 = prompt("What is the capital of France?").toLowerCase();
const q3 = prompt("What year is it?");

const checkAnswers = () => {
    let score = 0;
    if(q1 == "4") score++;
    if(q2 == 'paris') score++;
    if(q3 == "2025") score++;
    console.log(`Final Score: ${score}/3 correct!`);
}

checkAnswers();