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
  var loanWithInterest 
   =loans[0].loan_amount*(1+loans[0].loan_int_rate);
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
    loans[0].loan_year = parseInt($("#loan_year01").val());
    for(var i=1; i<5; i++) {
      loans[i].loan_year = loans[0].loan_year + i;
    }
    for(i = 1; i<6; i++){
      let amt = parseFloat($(`#loan_amt0${i}`).val()).toFixed(2);
      loans[i-1].loan_amount = amt;
    }
    let rate = parseFloat($("#loan_int01").val());
    for(i=0; i<5; i++){
      loans[i].loan_int_rate = rate;
    }
    
    updateForm();
    
  } // end: if
  
} // end: function updateLoansArray()

// -------------------------------------------------------
let updateForm = () => {
  loanWithInterest = 0;
  let totalAmt = 0;
  for(i = 1; i < 6; i++) {
    $(`#loan_year0${i}`).val(loans[i - 1].loan_year);
    let amt = loans[i - 1].loan_amount;
    $(`#loan_amt0${i}`).val(amt);
    totalAmt += parseFloat(amt);
    $(`#loan_int0${i}`).val(loans[i - 1].loan_int_rate);
    loanWithInterest 
      = (loanWithInterest + parseFloat(amt)) 
      * (1 + loans[0].loan_int_rate);
    $("#loan_bal0" + i).text(toMoney(loanWithInterest));
  }
  int = loanWithInterest - totalAmt;
  $(`#loan_int_accrued`).text(toMoney(int));
  
} // end: function updateForm()
  

// ----- ANGULAR -----

var app = angular.module("myApp", []);

app.controller("myCtrl", function($scope) {
  $scope.payments = [];
  $scope.populate = function () {
    
    updateForm();
    
    let total = loanWithInterest;
    let iRate = loans[0].loan_int_rate;
    let r = iRate / 12;
    let n = 11;
    //loan payment formula
    //https://www.thebalance.com/loan-payment-calculations-315564
    let pay = 12 * (total / ((((1+r)**(n*12))-1)/(r *(1+r)**(n*12))));
    for (let i = 0; i < 10; i++) {
      total -= pay 
      let int = total * (iRate); 
      $scope.payments[i] = {
        "year":loans[4].loan_year + i + 1,
        "payment": toMoney(pay), 
        "amt": toMoney(int),
        "ye": toMoney(total += int)
      }
    }
    $scope.payments[10] = {
      "year":loans[4].loan_year + 11,
      "payment": toMoney(total),
      "amt": toMoney(0),
      "ye":toMoney(0)
    }
  }
});
