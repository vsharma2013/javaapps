var elasticsearch = require('elasticsearch');
var dictonary = require('./domainStrings');

function ESApp(){
	this.init();
	this.esUrl = 'http://localhost:9200/companysales/sales';
}

ESApp.prototype.init = function(){
	this.client = new elasticsearch.Client({
		host: 'localhost:9200',
		requestTimeout : 1000 * 60 *5
		//,log: 'trace'
	});
}


ESApp.prototype.executeQuery = function(antlrQueryObject, cbOnDone){
	var esQuery = this.getESQueryFromQueryAndFilters(antlrQueryObject);
	this.client.search(esQuery, function(err, res){
		if(err){
			console.log(err);
			cbOnDone({success : false, results : 'error in ES query execute'});
		}
		else{
			cbOnDone({success : true, results : res});
		}
	});
	
}

ESApp.prototype.getESQueryFromQueryAndFilters = function(queryAndFilters){
	var esQuery = {
		index : 'companysales',
		type: 'sales',
		body: {
			query:{
			}
		}
	};

	esQuery.body.query.filtered = {
		query : {
			match : {}
		},
		filter:{}
	};
	var qKeys = Object.keys(queryAndFilters.query);
	esQuery.body.query.filtered.query.match[qKeys[0]] = dictonary.getDomainQualifiedStr(queryAndFilters.query[qKeys[0]]);

	if(qKeys.length === 2){
		esQuery.body.query.filtered.filter.term = {};
		esQuery.body.query.filtered.filter.term[qKeys[1]] = dictonary.getDomainQualifiedStr(queryAndFilters.query[qKeys[1]]);
	}
    if (queryAndFilters.filters && queryAndFilters.filters.hasFilters){
		esQuery.body.query.filtered.filter.and = [];
		var andFilters = queryAndFilters.filters.and;
		andFilters.forEach(function(f){
			if(!f.filter.isDate){
				var term = {term: {}};
				term.term[f.filter.name] = dictonary.getDomainQualifiedStr(f.filter.value);
				esQuery.body.query.filtered.filter.and.push(term);
			}
		});
	}
	return esQuery;
}

var gESApp = new ESApp();

module.exports = gESApp;