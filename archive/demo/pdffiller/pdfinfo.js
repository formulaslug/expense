var pdfFiller  = require( 'pdffiller' );
 
var sourcePDF = "OoPdfFormExample-2.pdf";
var nameRegex=null;
 
var FDF_data = pdfFiller.generateFDFTemplate( sourcePDF, nameRegex, function(err, fdfData) { 
    if (err) throw err;
    console.log(fdfData);
});