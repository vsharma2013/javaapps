function SalesTimeView(){

}

SalesTimeView.prototype.renderCategorySalesInTime = function(catSalesInTime, options){
	this.options = options;
	var yBlockWd = catSalesInTime.meta.yearBlockWidth;
	var svg = d3.selectAll('svg');

	var g = svg.append('g')
		       .attr('transform', 'translate(' + options.frmStartX + ',' + options.frmStartY + ') scale(1, -1)')
		       .attr('class', 'cat-time');
this.g = g;
    var xEnd = 0;	       
    Object.keys(catSalesInTime.data).forEach((function(yKey){

    	var catSaleInYear = catSalesInTime.data[yKey];

    	Object.keys(catSaleInYear).forEach((function(cKey){

    		 var c = catSaleInYear[cKey];

			 var r = this.addRect(g, c.x, c.y, c.W, c.H, cKey).attr('class', 's-cat');     //category rect

			 xEnd = c.x + c.W;

    	}).bind(this));

    	this.addLine(g, xEnd, 0, xEnd, -6);                                                // x axis ticks

    	this.addText(g, (xEnd-yBlockWd/2), 15, yKey);                                      // year labels

    }).bind(this));

    this.addLine(g, 0, 0, xEnd, 0);                                                        // x axis
    this.addLine(g, 0, 0, 0, options.frmHeight);                                           // y axis
    this.addYAxisLabels(g, xEnd, options.frmHeight, catSalesInTime.meta.yScale);           // y axis labels
    this.addCategoryMarkers(g, options.frmStartX);                                         // category markers
    this.addEventHandlers();
}

SalesTimeView.prototype.getFillStyleForCategory = function(category){
	var style = '';
	switch(category){
		case 'Automobile' : style = 'stroke-width : 1px; stroke : white; fill: #2b908f'; break;
		case 'Electronics' : style = 'stroke-width : 1px; stroke : white; fill: #90ee7e'; break;
		case 'Applicance' : style = 'stroke-width : 1px; stroke : white; fill: #f45b5b'; break;
		case 'Clothing' : style = 'stroke-width : 1px; stroke : white; fill: #7798BF'; break;
	}
	return style;
}
SalesTimeView.prototype.addRect = function(g, x, y, w, h, category){
	return g.append('rect')
	 .attr({
	 	x : x,
	 	y : y,
	 	width : w,
	 	height : h,
	 	style : this.getFillStyleForCategory(category)
	 });
}
SalesTimeView.prototype.addLine = function(g, px1, py1, px2, py2, s){
	g.append('line')
	 .attr({
		x1 : px1 || 0,
		y1 : py1 || 0,
		x2 : px2 || 0,
		y2 : py2 || 0,
		style : s || 'stroke-width : 1px; stroke : grey;'
	});
}

SalesTimeView.prototype.addText = function(g, x, y, label, textAnchor){
	g.append('g')
	 .attr('transform', 'scale(1,-1)')
	 .append('text')
	 .attr({
	 	x : x || 0,
	 	y : y || 0,
	 	'text-anchor' : textAnchor | 'middle',
	 	style:'color:grey;cursor:default;font-size:11px;fill:grey;'
	 })
	 .text(label);
}

SalesTimeView.prototype.addYAxisLabels = function(g, w, h, yScale){
	this.addLine(g, 0, h/4, w, h/4);
	this.addLine(g, 0, h/2, w, h/2);
	this.addLine(g, 0, 3*h/4, w, 3*h/4);
	this.addLine(g, 0, h, w, h);

	var max = yScale.domain()[1];
	this.addText(g, -35, -h/4, Math.round(max/4), null, 'end');
	this.addText(g, -35, -h/2, Math.round(max/2), null, 'end');
	this.addText(g, -35, -3*h/4, Math.round(3*max/4), null, 'end');
	this.addText(g, -35, -h, Math.round(max), null, 'end');

	var y = (-h/2.5);
	g.append('text')
	 .attr('transform', 'scale(1,-1) rotate(-180, -50, ' + y + ')')
	 .attr({
	 	x : -50,
	 	y : y,
	 	style : 'writing-mode: tb; glyph-orientation-vertical: 90;color:grey;cursor:default;font-size:15px;fill:grey;'
	 })
	 .text('SALES');
}

SalesTimeView.prototype.addCategoryMarkers = function(g, xStart){
	var arr = ['Clothing', 'Electronics', 'Automobile', 'Applicance'];
	var x = xStart + 200;
	var y = -40;
	arr.forEach((function(c){
		this.addRect(g, x, y, 10, 10, c);
		this.addText(g, x+15, -y, c)
		x+=80;
	}).bind(this));
}

SalesTimeView.prototype.addEventHandlers = function(){
	var self = this;
	$('.s-cat').on('click', function(e) {
		var rect = d3.select(this);
		self.handleCategorySelectClick({
			x : parseFloat(rect.attr('x')),
			y : parseFloat(rect.attr('y')),
			h : parseFloat(rect.attr('height')),
			w : parseFloat(rect.attr('width'))
		})
	})
}

SalesTimeView.prototype.handleCategorySelectClick = function(params){
	var xC = params.x + params.w/2 ;
	var yC = 0.75 * (params.h + params.y) ;
	var rI = 50, rO = 70;
	var thetaS = 15 * (Math.PI/180);
	var thetaE = 60 * (Math.PI/180);

	var x1 = xC + rI * Math.cos(thetaS);
	var y1 = yC + rI * Math.sin(thetaS);

	var x2 = xC + rO * Math.cos(thetaS);
	var y2 = yC + rO * Math.sin(thetaS);

	var x3 = xC + rO * Math.cos(thetaE);
	var y3 = yC + rO * Math.sin(thetaE);

	var x4 = xC + rI * Math.cos(thetaE);	
	var y4 = yC + rI * Math.sin(thetaE);

	var path = new Path();
	path.moveTo(x3, y3);
	path.arc(rO, rO, 0, 0, 0, x2, y2);
	path.lineTo(x1, y1);
	path.arc(rI, rI, 0, 0, 1, x4, y4);
	  
	//var g = d3.selectAll('cat-time');
	this.g.append('path')
	  .attr({
	  	d : path.toString(),
	  	style : 'stroke:white; stroke-width: 1px; fill-opacity:0.4; fill:white'
	  });
}












