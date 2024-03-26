const readline = require('readline')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

//Prompt the user to enter their speed in kilometers per hour 
rl.question('What is the speed of the vehicle?', (speed) => {
    const speednumber= parseInt(speed, 10)

    let demeritPoints = 0
    // Calculate the number of demerit points
    if (speednumber >= 70) {
        demeritPoints = Math.floor((speednumber - 70) / 5)
    }
    //Check if the speed is less than 70
    if (speednumber < 70)
        console.log("Ok")

    else {
        console.log(`Points: ${demeritPoints}`)
// Check if demerit points have exceeded the valid range
        if (demeritPoints > 12) {
            console.log("License Suspended")
        }
    }
    rl.close()
})
