// Prompt the user to enter student's score
let score= prompt("Please enter score");


// Convert the input to a number
score =parseFloat(score);


// Check if the input score is within the valid range of 0 to 100
if(score <0 || score >100){
    

//  Display an error message if the input is not within the valid range
    console.log("Error: Please enter a valid score")
}else{


    // Display the input if its within the valid range
    console.log("Success", score)
}

console.log(score);


// Determine the grade based on the score
if (score > 79){
    return "You got an A"

}
else if (score >= 60 && score <= 79){

    return "You got an B"
}
else if (score >= 49 && score <= 59){
    return "You got an C"
}
else if (score >= 40 && score <=48){
    return "You got an D"
}
else if (score < 40){
    return "You got an E"
}






console.log(70)