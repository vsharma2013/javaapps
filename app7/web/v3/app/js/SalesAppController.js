var $ = require('../../bower_components/jquery/dist/jquery.min');
var _ = require('../../bower_components/underscore/underscore-min')
var SalesTableModel = require('./models/SalesTableModel');
var React = require('react');
var D3BarChart = require('./Web Components/Charts/barChart/D3Bar.react');

function SalesAppController(){
	this.apiResp = null;
	this.catSalesInTime = null;
	this.rgnSalesInTine = null;
	this.salesTimeView = null;

	this.catSalesTableModel = null;
	this.rgnSalesTableModel = null;
	this.salesTableView = null;
	
	this.H = $('.svg-container').height();
	this.W = $('.svg-container').width();
	this.options = {
		frmStartX : 0,
		frmStartY : 0,
		frmWidth : this.W,
		frmHeight : 0.25 * this.H,
		controller : this,
		viewType : 'category'		
	};

	this.init();
}


SalesAppController.prototype.init = function(){
	$.getJSON('/api', (this.onApiResponse).bind(this));
}

SalesAppController.prototype.onApiResponse = function(resp){
	this.resp = resp;
	/*var salesTimeModel = new SalesTimeModel(this.options);
	this.catSalesInTime = salesTimeModel.getCategorySalesInTime(this.resp.results.aggregations.categories.buckets);	
	this.rgnSalesInTime = salesTimeModel.getCategorySalesInTime(this.resp.results.aggregations.regions.buckets);
	this.showSalesInTimeView(this.catSalesInTime);*/

	this.options.frmHeight = 0.55 * this.H;
	var salesTableModel = new SalesTableModel(this.options);
	this.catSalesTableModel = salesTableModel.getTableModel(this.resp.results.aggregations.categories.buckets);
	this.rgnSalesTableModel = salesTableModel.getTableModel(this.resp.results.aggregations.regions.buckets);
	this.showSalesTableView(this.catSalesTableModel);

	this.options = {
		frmStartX : 0,
		frmStartY : 0,
		frmWidth : this.W,
		frmHeight : 0.25 * this.H,
		controller : this,
		viewType : 'category'		
	};
}

SalesAppController.prototype.showSalesInTimeView = function(model){
	this.options.frmStartX = 0.06 * this.W;
	this.options.frmStartY = 0.30 * this.H;
	if(!this.salesTimeView)
		this.salesTimeView = new SalesTimeView();
	//this.salesTimeView.render(model, this.options);	
}

SalesAppController.prototype.showSalesTableView = function(model){	
	this.options.frmStartX = 0.06 * this.W;
	this.options.frmStartY = 0.95 * this.H;
	//if(!this.salesTableView)
		//this.salesTableView = new SalesTableView();
	//this.salesTableView.render(model, this.options);
	var selCol = _.where(this.model.columns, {name : selColName})[0];
	var selRow = _.where(selCol.rows, {name : selRowName})[0];
	var height = 500;
	var width = 800;
	var left = 100;
	var top = 200;
	React.render(<D3BarChart data={selRow} height={height} width={width} top={top} left={left} />,
    document.body);

}

SalesAppController.prototype.activeViewChange = function(active){
	this.salesTimeView.clear();
	this.options.viewType = active;
	switch(active){
		case 'category' : 
			this.showSalesInTimeView(this.catSalesInTime);
			this.showSalesTableView(this.catSalesTableModel);
			break;
		case 'region' : 
			this.showSalesInTimeView(this.rgnSalesInTime);
			this.showSalesTableView(this.rgnSalesTableModel);
			break;
	}
}

module.exports = SalesAppController;










