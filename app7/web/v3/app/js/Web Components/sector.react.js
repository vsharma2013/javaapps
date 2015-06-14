var React = require('react');
var d3 = require('d3');

var Sector = React.createClass({
  render: function() {
    var outerRadius = this.props.width/2.2;
    var innerRadius = 0;
    var arc = d3.svg.arc()
        .outerRadius(outerRadius)
        .innerRadius(innerRadius);
    var data = this.props.data;
    var center = "translate(" + arc.centroid(data) + ")";
    var color = this.props.colors;
    return (
      <g>
        <path fill={color[this.props.ikey]} d={arc(this.props.data)}></path>
        <text fill="white" transform={center} textAnchor="middle"          
            fontSize="15px">{data.value}
        </text>
      </g>
    );
  }
});

module.exports = Sector;