// Investment Accounts Start Code

// HTML Variables
let outputEl = document.getElementById("output");

// Global Variables
let data = []; // account data
let maxVal = 5000; // max data value

//generate random data
for (let i = 0; i < 50; i++) {
  data.push(Math.floor(Math.random() * (maxVal + 1)));
}

// Draw Array every 20ms
setInterval(drawDataArray, 20);

// Main Menu & Go Button
document.getElementById("go-btn").addEventListener("click", mainMenu);

function mainMenu() {
  // Get value of menu select element
  let selection = document.getElementById("menu-select").value;

  // Take action based on menu selection
  if (selection === "deposit") {
    deposit();
  } else if (selection === "withdrawal") {
    withdrawal();
  } else if (selection === "count") {
    countUnder2000();
  } else if (selection === "donor") {
    generousDonor();
  } else if (selection === "attack") {
    hackerAttack();
  }
}

// ******************************************************
// MENU SELECTION FUNCTIONS
// ******************************************************
function deposit() {
  // Prompt the user for the index of an account and the amount to deposit into that account.
  let depositAccount = parseInt(prompt("Please select an account:"));
  let depositAmount = parseInt(prompt("Please enter the amount you would like to deposit:"));

  // Check if index is valid
  if (isNaN(depositAccount) || depositAccount < 0 || depositAccount >= data.length) {
    outputEl.innerHTML = "Invalid account index.";
    return;
  }

  // Check if deposit amount is valid
  if (isNaN(depositAmount) || depositAmount <= 0) {
    outputEl.innerHTML = "Invalid deposit amount.";
    return;
  }
  
  // Update the account balance after withdrawal
  data[depositAccount] += depositAmount;
  
  // Adjust maxVal if necessary
  if (data[depositAccount] > maxVal) {
    maxVal = data[depositAccount];
  }
  
  // Provide a confirmation message
  outputEl.innerHTML = `Deposit of $${depositAmount} from account at index ${depositAccount} was successful.`;
}

function withdrawal() {
  // Prompt the user for the index of an account and the amount to deposit into that account.
  let withdrawalAccount = parseInt(prompt("Please select an account:"));
  let withdrawalAmount = parseInt(prompt("Please enter the amount you would like to deposit:"));

  //check if index is valid
  if (isNaN(withdrawalAccount) || withdrawalAccount < 0 || withdrawalAccount >= data.length) {
    outputEl.innerHTML = "Invalid account index.";
    return;
  }
  
  // Check if withdrawal amount is valid
  if (isNaN(withdrawalAmount) || withdrawalAmount <= 0) {
    outputEl.innerHTML = "Invalid withdrawal amount.";
    return;
  }
  
  // Check if account has enough funds
  if (data[withdrawalAccount] < withdrawalAmount) {
    outputEl.innerHTML = "Insufficient funds.";
    return;
  }
  
  // Update the account balance after withdrawal
  data[withdrawalAccount] -= withdrawalAmount;
  
  // Provide a confirmation message
  outputEl.innerHTML = `Deposit of ${withdrawalAmount} from account at index ${withdrawalAccount} was successful.`;
}

function countUnder2000() {
  // Count the number of accounts that are less than 2000
  let account = 0
  for (let i = 0; i < data.length; i++) {
    if (data[i] < 2000) {
      account++
    }
  }
  // Use the outputEl to display the results of the count.
  outputEl.innerHTML = `Count under 2000: ${account}`;
}

function generousDonor() {
  // A generous donor has decided to give $500 to every investment
  // account that has less than $2000.
  let totalDonated = 0;

  // Modify the data array to apply this donation.
  for (let i = 0; i < data.length; i++) {
    if (data[i] < 2000) {
      //add 500 to account
      data[i] += 500;
      //calc total donated amount
      totalDonated += 500;
    }
  }

  // Use the outputEl to display the total amount of money that was donated.
  outputEl.innerHTML = `Generous Donor donated a total of $${totalDonated}`;
}

function hackerAttack() {
  // A hacker steals 5% from every account.
  let totalStolen = 0;
  // Modify the data array to apply this theft.
  for (let i = 0; i < data.length; i++) {
    //calc amount stolen from each account
    let amountStolen = data[i] * 0.05
    //take away 5%
    data[i] -= amountStolen
    console.log(data[i])
    //calc total stolen amount
    totalStolen += amountStolen
  }
  // Use the outputEl to display the total amount that was stolen.

  outputEl.innerHTML = `Hacker Attack stole a total of $${totalStolen}`;
}

// ******************************************************
// END OF MENU SELECTION FUNCTIONS
// ******************************************************

// Function to draw current state of data array
function drawDataArray() {
  let outputStr = "";
  for (let val of data) {
    let divHeight = (val / maxVal) * 600; // Scale grades to fit in array visualizer container
    outputStr += `<div style="height:${divHeight}px"></div>`;
  }
  document.getElementById("container").innerHTML = outputStr;
}
