      // --- global variables ---
      //var myTab = document.getElementById("loan_table");
      //alert(myTab.rows[1].cells[0].innerHTML);
      var loans = [{
              loan_year: 2020,
              loan_amount: 10000.00,
              loan_int_rate: 0.0453
          },
          {
              loan_year: 2021,
              loan_amount: 10000.00,
              loan_int_rate: 0.0453
          },
          {
              loan_year: 2022,
              loan_amount: 10000.00,
              loan_int_rate: 0.0453
          },
          {
              loan_year: 2023,
              loan_amount: 10000.00,
              loan_int_rate: 0.0453
          },
          {
              loan_year: 2024,
              loan_amount: 10000.00,
              loan_int_rate: 0.0453
          }
      ];




      // --- function: loadDoc() ---
$(document).ready(function() {
    
  // pre-fill defaults for first loan year which has since been modified to work using jquery
  var defaultYear = loans[0].loan_year;
  $("#loan_year0"+1).val(defaultYear++);//swapped document.getElementById to $ and using # to find the ID
  var defaultLoanAmount=loans[0].loan_amount;
  $("#loan_amt0"+1).val(defaultLoanAmount.toFixed(2));//swapped document.getElementById to $ and using # to find the ID
  var defaultInterestRate=loans[0].loan_int_rate;
  $("#loan_int0"+1).val(defaultInterestRate);//swapped document.getElementById to $ and using # to find the ID
  var loanWithInterest =loans[0].loan_amount*(1+loans[0].loan_int_rate);
  $("#loan_bal0"+1).text(toMoney(loanWithInterest));//swapped document.getElementById to $ and using # to find the ID
    
  // pre-fill defaults for other loan years which has been modified to function with jquery
  for(let i=2;i<6;i++) {
    $(`#loan_year0${i}`).val(defaultYear++);//for every value at position i with id of loan_year0 change the value to the default year +1 going down 
    $(`#loan_year0${i}`).attr("disabled","true");//set all year values except the first one to disabled
    $(`#loan_year0${i}`).css({"backgroundColor":"grey","color":"white"});//set the disabled years to have a gray background with white text
    $(`#loan_amt0${i}`).val(defaultLoanAmount.toFixed(2));//apply the same 10,000 dollar value to the full loan_amt0 id
    $(`#loan_int0${i}`).val(defaultInterestRate);//apply the default interest rate all along the interest rate column and anything with the id of loan_int0
    $(`#loan_int0${i}`).attr("disabled","true");//disable all id's with the loan_int0 value except the first one
    $(`#loan_int0${i}`).css({"backgroundColor":"grey","color":"white"});//set all values with the loan_int0 id to a background of gray and a text color of white.
    loanWithInterest=(loanWithInterest + defaultLoanAmount)*(1 + defaultInterestRate);
    $("#loan_bal0" + i).text(toMoney(loanWithInterest));//simply swapped the document.getElementById to a $ and threw in a # to seek the id tag
  } // end: "for" loop
    
  $("input[type=text]").focus(function() {
    $(this).select();
    $(this).css("background-color", "yellow");
  }); 
  $("input[type=text]").blur(function() {
    $(this).css("background-color", "white");
    updateLoansArray();
  });
    
  // set focus to first year: messes up codepen
  // $("#loan_year01").focus();

}); // end: function loadDoc()

// -------------------------------------------------------

      function toComma(value) {
          return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }

      let toMoney = (value) => {
         return `\$${toComma(value.toFixed(2))}`; 
      }

function updateLoansArray() {
  
  //the following values will controll the ability for a value to be entered.
  let yearcontroller = /^(19|20)\d{2}$/;//checks if the value is a number and within 1899 and 2099
  let amountcontroller = /^([1-9][0-9]*)+(.[0-9]{1,2})?$/;//checks if the value is a number and above 1 whole dollar
  let integercontroller = /^(0|)+(.[0-9]{1,5})?$/;//checks to ensure the value is a number is below 1.0
  let tracker = true;//used to see if there is anything wrong with the constraints listed above
 
  if(!yearcontroller.test($(`#loan_year01`).val())){//if yearcontroller does not pass
    tracker = false;//set to false
    alert("error in year field");//prompt user with incorrect value
  }
  
  for (i = 1; i < 6; i++) {//loop through full amount field
    if(!amountcontroller.test($(`#loan_amt0${i}`).val())) {//if amountcontrolelr is not passed
      tracker = false;//set to false
      alert("error in amount field in box: "+i);//prompt user with error in boxes
    } 
  }
  
  if(!integercontroller.test($(`#loan_int01`).val())) {//if integercontroller is not passed
    tracker = false;//set to false
    alert("error in interest rate field");//prompt user with error in interest rate field.
  }

  if(tracker) {//if all previous operations pass with flying colors execute follwing action
    loans[0].loan_year = parseInt($("#loan_year01").val());//pass the year value from the input box
    for(var i=1; i<5; i++) {//loop for the rest ofthe input field
      loans[i].loan_year=loans[0].loan_year + i;//apply value to loans adding i for proper input
    }
    
    for(i = 1; i<6; i++){//loop for entirety of amount field to save values
      let amount = parseFloat($(`#loan_amt0${i}`).val()).toFixed(2);//pass the float value as it is a decimal value technically
      loans[i-1].loan_amount=amount;//save value to loans array.
    }
    
    let interestrate = parseFloat($("#loan_int01").val());//generate interest rate value
    for(i=0; i<5; i++){//loop for interest rate field
      loans[i].loan_int_rate = interestrate;//save interest rate to loans
    }
    
    
  loanWithInterest = 0;//initialize loanwithinterest
  let totalloan = 0;//create and initialize the totalloan value
  for(i = 1; i < 6; i++) {//loop for entire field
    $(`#loan_year0${i}`).val(loans[i-1].loan_year);//change the value of the entirety of the loan_year field based on values stored in loans
    let loaned=loans[i-1].loan_amount;//create and initialize loaned variable
    $(`#loan_amt0${i}`).val(loaned);//pull the loaned amount
    totalloan += parseFloat(loaned);//accumulate total amount loaned
    $(`#loan_int0${i}`).val(loans[i - 1].loan_int_rate);//pull integer value
    loanWithInterest=(loanWithInterest + parseFloat(loaned))*(1 + loans[0].loan_int_rate);//calculate the total loaned value with interest
    $("#loan_bal0" + i).text(toMoney(loanWithInterest));//apply value of loanwithinterest
  }
  let totalamountowed=loanWithInterest-totalloan;
  $(`#loan_int_accrued`).text(toMoney(totalamountowed));//apply value for total interest collected over college career
  }
}

