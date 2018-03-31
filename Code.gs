function getSpreadsheetData(sheetName) {
  // This function gives you an array of objects modeling a worksheet's tabular data, where the first items — column headers — become the property names.
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
   data.forEach(function (row) {
     
    form.addPageBreakItem()
    
    form.addSectionHeaderItem()
        .setTitle(data_section_name);

     
    form.addScaleItem()
        .setTitle(row[data_section_name])
        .setBounds(1, 10)
        .setRequired(true);
  });
}

function make_form(column_name) {
  // create form
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

var COLUMN_TO_USE = 'Input text'

function gen_form(){
 
    make_form(COLUMN_TO_USE);

}

