
const readline = require('readline');

//define tax rates functions
function calculateTax(income) {
    let tax = 0
    const taxSlabs = [
        { limit: 5999, deduction: 150 },
        { limit: 7999, deduction: 300 },
        { limit: 29999, deduction: 850 },
        { limit: 39999, deduction: 950 },
        { limit: 100000, deduction: 1700 }

    ]

    //initialize remaining income to total income
    let remainIncome = income;

    //iterate through each tax slab calculate the tax 
    for (const slab of taxSlabs) {
        //check if there is any remaining income to be taxed
        if (remainIncome <= 0) break;
        //calculate taxable amount within the current slab
        const taxableAmount = Math.min(remainIncome, slab.limit);
        //calculate the tax for the taxable amount
        tax += taxableAmount * slab.rate;

        //update 
        remainIncome -= taxableAmount
    }

    //return the total tax calculation
    return tax;
}

//define NHIF rates
function calculateNHIFDeductions(grossPay) {
    const nhifRates = [
        { limit: 5999, deduction: 150 },
        { limit: 7999, deduction: 300 },
        { limit:}
        { limit: 11999, deduction: 400 },
        { limit: 29999, deduction: 850 },
        { limit: 100000, deduction: 1700 },

    ];
    for (const rate of nhifRates) {
        if (grossPay <= rate.limit) {
            return rate.deduction;
        }
    }
    //exceed the highest limit
    return nhifRates[nhifRates.length - 1].deduction;

}


//define NSSF rates 
function calculateNSSFContributions(pensionalPay) {
    //employee contribution rate for tier 1
    const tier1Rate = 0.06;
    //lowerlimit foe tier 2
    const tier2LowestLimit = 7001;

    if (pensionalPay <= tier2LowestLimit) {
        //is it within? calc contr based on tier 1 rate
        return pensionalPay * tier1Rate;
    } else {
        //if it exceeds
        return tier2LowestLimit * tier1Rate;
    }
}

// Calculate our net salary
function calculateNetSalary(basicSalary, benefits) {
    // Calculate gross salary>>> adding basic salary and benefits
    const grossSalary = basicSalary + benefits;
    //calculate tax 
    const tax = calculateTax(grossSalary);
    //calculate NHIF decuctions based on grosssalary
    const NHIFDeductions = calculateNHIFDeductions(grossSalary);
    //calculate NSSF deductions based on basic salary
    const NSSFDeductions = calculateNSSFContributions(basicSalary);
    //net salary>> Sub tax,NHIF deduction, & NSSF deduction from gross salary
    const netSalary = grossSalary - tax - NHIFDeductions - NSSFDeductions;

    //results
    return {
        grossSalary,
        tax,
        NHIFDeductions,
        NSSFDeductions,
        netSalary
    };
}

//function to get the user input
function getUserInput(question) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout

    });

    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            rl.close();
            resolve(parseFloat(answer));
        });
    });
}
//function to run the program
async function run() {
    //get user input for basic salary

    const basicSalary = await getUserInput("your basic salary = ");

    //get user benefits 
    const benefits = await getUserInput("Your Benefits = ");

    //calc net salary in response to user input
    const salaryDetails = calculateNetSalary(basicSalary, benefits);

    //display the calc
    console.log("Gross = ", salaryDetails.grossSalary);
    console.log("Tax = ", salaryDetails.tax);
    console.log("NHIF Ded = ", salaryDetails.NHIFDeductions);
    console.log("NSSF Ded = ", salaryDetails.NSSFDeductions);
    console.log("Net = ", salaryDetails.netSalary);
}

run();