$(document).ready(function(){
    
    // Get Form inputs
var newDDA =   document.getElementById('newDDA');
var ddaPercentage = document.getElementById('ddaPercentage');
var customerValue = document.getElementById('customerValue');
var customerRetention = document.getElementById('customerRetention');
var costPerSwitch = document.getElementById('costPerSwitch');


function calculateRoi() {
    // Get result fields
    var var1= document.getElementById('newDepositAdoption');
    var var2= document.getElementById('incRevenueResult');
    var var3= document.getElementById('costResult');
    var var4= document.getElementById('profitIncreaseResult');
    var var5= document.getElementById('costPaybackResult');
    var var6= document.getElementById('irrResult');
    var var7= document.getElementById('valueAddedResult');

    // Calculate
    var newDepositAdoption= '';
        if (ddaPercentage.value/100 > 0.6) {
            newDepositAdoption = (ddaPercentage.value/100 * 1.33333333);
        }
        else {
            newDepositAdoption = (ddaPercentage.value/100 + 0.2);
        }
    var incRevenueResult= (((newDepositAdoption - (ddaPercentage.value / 100)) * newDDA.value) * customerValue.value);
    var costResult= ((newDepositAdoption) * costPerSwitch.value * newDDA.value);
    var profitIncreaseResult= (incRevenueResult - costResult);
    var costPaybackResult= ((costResult / incRevenueResult) * 12);
    var irrResult= incRevenueResult / 1000;
    var valueAddedResult= customerRetention.value * customerValue.value;

    // Apply results

    var1.innerHTML= newDepositAdoption.toFixed(2) * 100;
    var2.innerHTML= incRevenueResult.toLocaleString('en-US', {style:'currency', currency:'USD'});
    var3.innerHTML= costResult.toLocaleString('en-US', {style:'currency', currency:'USD'});
    var4.innerHTML= profitIncreaseResult.toLocaleString('en-US', {style:'currency', currency:'USD'});
    var5.innerHTML= costPaybackResult.toFixed(2);
    var6.innerHTML= irrResult.toFixed();
    var7.innerHTML= valueAddedResult.toLocaleString('en-US', {style:'currency', currency:'USD'});

    $(var1).append('%');
    $(var5).append(' months');
    $(var6).append('%');
 

    return false;
}

$('.roiAnalizerContainer').on('click','#ctaCalculate',function(){
    calculateRoi();
    
 });


});