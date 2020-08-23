
function convertDate(date, code) {
  var datearray = date.split("-");

  if (datearray[0].length === 2 && code === "TL") {
    var newdate = datearray[0] + '-' + datearray[1] + '-' + datearray[2];
  } else if (datearray[0].length > 2 && code === "TL") {
    var newdate = datearray[2] + '-' + datearray[1] + '-' + datearray[0];
  } else if (datearray[0].length === 2 && code === "TK") {
    var newdate = datearray[2] + '-' + datearray[1] + '-' + datearray[0];
  } else if (datearray[0].length > 2 && code === "TK") {
    var newdate = datearray[0] + '-' + datearray[1] + '-' + datearray[2];
  }

  return newdate;
}

module.exports = convertDate