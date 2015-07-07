
var _ = require('underscore');

function DateTime(){

}

DateTime.prototype.getDateRangeFromFilters = function(filters){
	var dateRange = { hasDates : false, startDate: '2000/01/01', endDate: '2000/01/01'};
	if(!filters) return dateRange;

	var andOrFilters = filters.and.concat(filters.or);
	var map = {};
	var mapFuzzy = {};
	andOrFilters.forEach(function(filter){
		if(filter.filter.isDate){
			map[filter.filter.operator] = filter.filter.value;
			mapFuzzy[filter.filter.operator] = {
				name : filter.filter.name,
				value : filter.filter.value
			}
		}
	});
		
	var keys = Object.keys(map);
	if(keys.length === 0) return dateRange;

	dateRange = this.isFuzzyDateExpression(mapFuzzy) ? this.getFuzzyDateRange(mapFuzzy) : this.getRegularDateRange(map);
	return dateRange;
}

DateTime.prototype.getRegularDateRange = function(map){	
	var keys = Object.keys(map);
	var dateRange = { hasDates : false, startDate: '2000/01/01', endDate: '2000/01/01'};
	var minStartDate = '2000/01/01';
	var maxEndDate = '2015/12/31';

	if(keys.length === 1 && this.isEQ(keys[0])){
		dateRange.hasDates = true;
		dateRange.startDate = map[keys[0]];
		dateRange.endDate = map[keys[0]];
		return dateRange;
	}

	if(keys.length === 1 && this.isLT_Or_LE_Or_To(keys[0])){
		dateRange.hasDates = true;
		dateRange.startDate = minStartDate;
		dateRange.endDate = map[keys[0]];
		return dateRange;
	}

	if(keys.length === 1 && this.isGT_Or_GE_Or_From(keys[0])){
		dateRange.hasDates = true;
		dateRange.endDate = maxEndDate;
		dateRange.startDate = map[keys[0]];
		return dateRange;
	}	

	var eDate = map['<'] || map['<='] || map['to'];
	var sDate = map['>'] || map['>='] || map['from'];


	if(sDate && eDate){
		dateRange.hasDates = true;
		dateRange.endDate = eDate;
		dateRange.startDate = sDate;
		return dateRange;
	}		

	return dateRange;
}

DateTime.prototype.getFuzzyDateRange = function(map){
	var keys = Object.keys(map);
	var op = keys[0];
	var filterValue = map[op].value;
	var dateRange = { hasDates : true, startDate: '2000/01/01', endDate: '2000/01/01'};
	if(this.isInLast(op)){
		var nVal = parseInt(filterValue.match(/\d+/)[0]);
		if(filterValue.indexOf('years') !== -1 || filterValue.indexOf('year') !== -1){
			var dtNow = new Date('2015/01/01');
			dateRange.startDate = dtNow.getFullYear() - nVal + '/' + (dtNow.getMonth() + 1) + '/' + dtNow.getDate();
			dateRange.endDate = dtNow.getFullYear() + '/' + (dtNow.getMonth() + 1) + '/' + dtNow.getDate();
		}
		else{
			var tsnMonthsBack = Date.parse('2015/01/01') - (1000 * 60 * 60 * 24 * 30 * nVal);
			var dtnMonthsBack = new Date(tsnMonthsBack);
			var dtNow = new Date('2015/01/01');
			dateRange.startDate = dtnMonthsBack.getFullYear()+ '/' + (dtnMonthsBack.getMonth() + 1) + '/' + dtnMonthsBack.getDate();
			dateRange.endDate = dtNow.getFullYear() + '/' + (dtNow.getMonth() + 1) + '/' + dtNow.getDate();
		}
	}
	else{
		dateRange.startDate = filterValue + '/01/01';
		dateRange.endDate = filterValue + '/12/31';
	}
	return dateRange;
}

DateTime.prototype.isFuzzyDateExpression = function(map){
	var keys = Object.keys(map);
	if(keys.length !== 1) return false;

	var op = keys[0];
	var filter = map[op];

	if(this.isInLast(op)) return true;

	if(this.isEQ(op) && filter.name === 'year' ) return true;

	return false;
}

DateTime.prototype.isEQ = function(op){
	return op === '=' || op === 'is';
}

DateTime.prototype.isLT = function(op){
	return op === '<';
}

DateTime.prototype.isLE = function(op){
	return op === '<=';
}

DateTime.prototype.isFrom = function(op){
	return op === 'from';
}

DateTime.prototype.isLT_Or_LE = function(op){
	return this.isLT(op) || this.isLE(op);
}

DateTime.prototype.isLT_Or_LE_Or_To = function(op){
	return this.isLT_Or_LE(op) || this.isTo(op);
}

DateTime.prototype.isGT = function(op){
	return op === '>';
}

DateTime.prototype.isGE = function(op){
	return op === '>=';
}

DateTime.prototype.isTo = function(op){
	return op === 'to';
}

DateTime.prototype.isGT_Or_GE = function(op){
	return this.isGT(op) || this.isGE(op);
}

DateTime.prototype.isGT_Or_GE_Or_From = function(op){
	return this.isGT_Or_GE(op) || this.isFrom(op);
}

DateTime.prototype.isInLast = function(op){
	return op === 'in last';
}

var gDateTime = new DateTime();

module.exports = gDateTime;