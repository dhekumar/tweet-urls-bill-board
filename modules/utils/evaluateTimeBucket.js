var moment = require('moment');

module.exports = function(time){

	// Return daily timebucket of the format 2014001 - > 1 jan 2014 ; 2014032 - > 1 Feb 2014
	return parseInt(moment(time).format('YYYYDDDHH'+'00'));
}
