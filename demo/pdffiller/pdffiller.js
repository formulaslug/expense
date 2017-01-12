var pdfFiller   = require('pdffiller');
 
var sourcePDF = "OoPdfFormExample-2.pdf";
var destinationPDF =  "test_complete.pdf";
var data=
{ 'Given Name Text Box': 'John',
  'Family Name Text Box': 'Smith',
  'House nr Text Box': '1',
  'Address 2 Text Box': 'UCSC',
  'Postcode Text Box': '95064',
  'Country Combo Box': 'United States',
  'Height Formatted Field': '200 cm',
  'City Text Box': 'Santa Cruz',
  'Driving License Check Box': '',
  'Favourite Colour List Box': 'Blue',
  'Language 1 Check Box': '',
  'Language 2 Check Box': '',
  'Language 3 Check Box': '',
  'Language 4 Check Box': '',
  'Language 5 Check Box': '',
  'Gender List Box': 'Male',
  'Address 1 Text Box': '64 Merrill Rd' 
};

 
var shouldFlatten = false;
pdfFiller.fillFormWithFlatten( sourcePDF, destinationPDF, data, shouldFlatten, function(err) {
    if (err) throw err;
    console.log("In callback (we're done).");
})