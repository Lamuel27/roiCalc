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
            newDepositAdoption = (ddaPercentage.value/100 * 1.3);
        }
        else {
            newDepositAdoption = (ddaPercentage.value/100 + 0.2);
        }
    var incRevenueResult= (((newDepositAdoption - (ddaPercentage.value / 100)) * newDDA.value) * customerValue.value);
    var costResult= ((newDepositAdoption) * costPerSwitch.value * newDDA.value);
    var profitIncreaseResult= (incRevenueResult - costResult);
    var costPaybackResult= ((costResult / incRevenueResult) * 12);
    var irrResult= incRevenueResult / costResult * 100;
    var valueAddedResult= customerRetention.value * customerValue.value;

    // Apply results

    var1.innerHTML= newDepositAdoption.toFixed(2) * 100;
    var2.innerHTML= incRevenueResult.toLocaleString('en-US', {style:'currency', currency:'USD'});
    var3.innerHTML= costResult.toLocaleString('en-US', {style:'currency', currency:'USD'});
    var4.innerHTML= profitIncreaseResult.toLocaleString('en-US', {style:'currency', currency:'USD'});
    var5.innerHTML= costPaybackResult.toFixed(1);
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

//  print the screen
 $('#cmd').click(function(){
    window.print();
    return false;
});

function getPDF(){

    var HTML_Width = $(".canvas_div_pdf").width();
    var HTML_Height = $(".canvas_div_pdf").height();
    var top_left_margin = 15;
    var PDF_Width = HTML_Width+(top_left_margin*2);
    var PDF_Height = (PDF_Width*1.5)+(top_left_margin*2);
    var canvas_image_width = HTML_Width;
    var canvas_image_height = HTML_Height;
    
    var totalPDFPages = Math.ceil(HTML_Height/PDF_Height)-1;
    

    html2canvas($(".canvas_div_pdf")[0],{allowTaint:true}).then(function(canvas) {
        canvas.getContext('2d');
        
        console.log(canvas.height+"  "+canvas.width);
        
        
        var imgData = canvas.toDataURL("image/jpeg", 1.0);
        var pdf = new jsPDF('p', 'pt',  [PDF_Width, PDF_Height]);
        pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin,canvas_image_width,canvas_image_height);
        
        
        for (var i = 1; i <= totalPDFPages; i++) { 
            pdf.addPage(PDF_Width, PDF_Height);
            pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height*i)+(top_left_margin*4),canvas_image_width,canvas_image_height);
        }
        
        pdf.save("HTML-Document.pdf");
    });
};

$('#cmd2').click(function(){
    getPDF();
});

});