$(document).ready(function(){
    
    // Get Form inputs
var newDDA =   document.getElementById('newDDA');
var ddaPercentage = document.getElementById('ddaPercentage');
var customerValue = document.getElementById('customerValue');
var customerRetention = document.getElementById('customerRetention');
var costPerSwitch = document.getElementById('costPerSwitch');
var newDepositAdoption = document.getElementById('newDepositAdoption');


function calculateRoi() {
    // Get result fields
    // var var1= document.getElementById('newDepositAdoption');
    var var2= document.getElementById('incRevenueResult');
    var var3= document.getElementById('costResult');
    var var4= document.getElementById('profitIncreaseResult');
    var var5= document.getElementById('costPaybackResult');
    var var6= document.getElementById('irrResult');
    var var7= document.getElementById('valueAddedResult');
    var var8= document.getElementById('irrlength');
    var var9= document.getElementById('accountLength');

    // Calculate
    // var newDepositAdoption= '';
    //     if (ddaPercentage.value/100 > 0.6) {
    //         newDepositAdoption = (ddaPercentage.value/100 * 1.3);
    //     }
    //     else {
    //         newDepositAdoption = (ddaPercentage.value/100 + 0.2);
    //     }
    var incRevenueResult= ((((newDepositAdoption.value / 100) - (ddaPercentage.value / 100)) * newDDA.value) * customerValue.value);
    var costResult= ((newDepositAdoption.value / 100) * costPerSwitch.value * newDDA.value);
    var profitIncreaseResult= (incRevenueResult - costResult);
    var costPaybackResult= ((costResult / incRevenueResult) * 12);
    var irrResult= incRevenueResult / costResult * 100;
    var valueAddedResult= customerRetention.value * customerValue.value;
    var irrlength= 'IRR over ' + customerRetention.value + ' year customer relationship';
    var accountLength= 'Value added per account over ' + customerRetention.value + ' year relationship';
    // Apply results

    var2.innerHTML= incRevenueResult.toLocaleString('en-US', {style:'currency', currency:'USD'});
    var3.innerHTML= costResult.toLocaleString('en-US', {style:'currency', currency:'USD'});
    var4.innerHTML= profitIncreaseResult.toLocaleString('en-US', {style:'currency', currency:'USD'});
    var5.innerHTML= costPaybackResult.toFixed(1);
    var6.innerHTML= irrResult.toFixed();
    var7.innerHTML= valueAddedResult.toLocaleString('en-US', {style:'currency', currency:'USD'});
    var8.innerHTML= irrlength;
    var9.innerHTML= accountLength;

    $(var5).append(' months');
    $(var6).append('%');
 

    return false;
}

$('.roiAnalizerContainer').on('click','#ctaCalculate',function(){
    calculateRoi();
    
 });

 var doc = new jsPDF();
 var specialElementHandlers = {
     '#editor': function (element, renderer) {
         return true;
     }
 };
 
 $('#cmd').click(function () {
     doc.fromHTML($('#content').html(), 15, 15, {
         'width': 170,
             'elementHandlers': specialElementHandlers
             
     });
     doc.save('ClickSWITCHROI.pdf');
 });

});