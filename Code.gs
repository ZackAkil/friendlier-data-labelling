function getSpreadsheetData(sheetName) {
  // Return an list of objects (one for each row) containing the sheets data. 
  
  var arrayOfArrays = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName || 'Sheet1').getDataRange().getValues();
  var headers = arrayOfArrays.shift();
  return arrayOfArrays.map(function (row) {
    return row.reduce(function (memo, value, index) {
      if (value) {
        memo[headers[index]] = value;
      }
      return memo;
    }, {});
  });
}

function create_ranges_for_data(form, data, data_section_name){
  
   // loop throughh each row
   data.forEach(function (row) {
     
       // create a new question page
      form.addPageBreakItem()

       // add page title
      form.addSectionHeaderItem()
          .setTitle(data_section_name);

       // create number range input with the title being the document to be labeled
      form.addScaleItem()
          .setTitle(row[data_section_name])
          .setBounds(1, 10)
          .setRequired(true);
  });
}

function make_form_using_column(column_name) {
  // create a new Google Form document
  
  var form = FormApp.create('Data lablleing - ' + column_name)
  
  desc = "\
  Please grade each document. \n \
  This is an extremly important step in the development of the automation.";
  
  form.setDescription(desc);
  form.setProgressBar(true);
  form.setShowLinkToRespondAgain(false)
 
  var data = getSpreadsheetData();
  
  create_ranges_for_data(form, data, column_name);
}

function gen_form(){
  
    var COLUMN_TO_USE = 'Input text'
    
    make_form_using_column(COLUMN_TO_USE);
}

