var React = require('react');
var d3 = require('d3');
var Sector = require('./sector.react');

var DataSeries = React.createClass({
  propTypes: {
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
    color: React.PropTypes.array,
    data: React.PropTypes.array.isRequired,
  },
  render: function() {
    var color = this.props.colors;
    var data = this.props.data;
    var width = this.props.width;
    var height = this.props.height;
    var pie = d3.layout.pie();
    var result = data.map(function(item){
      return item.count;
    })
    var names = data.map(function(item){
      return item.name;
    })
    var sum = result.reduce(function(memo, num){ return memo + num; }, 0);
    var position = "translate(" + (width)/2 + "," + (height)/2 + ")";
    var bars = (pie(result)).map(function(point, i) {
      return (
        <Sector data={point} ikey={i} key={i} name={names[i]} colors={color} total=  
        {sum} width={width} height={height}/>
      )
    });

    return (
        <g transform={position}>{bars}</g>
    );
  }
});

module.exports = DataSeries;