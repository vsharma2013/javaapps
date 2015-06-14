var React = require('react');
var D3Chart = require('./D3Chart.react');
var DataSeries = require('./DataSeries.react');
//var TodoActions = require('../actions/TodoActions');
//var TodoTextInput = require('./TodoTextInput.react');


var D3PieChart = React.createClass({
  propTypes: {
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    title: React.PropTypes.string,
    data: React.PropTypes.array.isRequired,
  },

  getDefaultProps: function() {
    return {
      width: 300,
      height: 350,
      title: '',
      Legend: true,
    };
  },

  render: function() {
    var colors = ['#FD9827', '#DA3B21', '#3669C9', '#1D9524', '#971497'];
    return (
      <div>
        <D3Chart width={this.props.width} height={this.props.height}>
         <DataSeries data={this.props.data} colors={colors} width={this.props.width} height={this.props.height}>
         </DataSeries>
        </D3Chart>
        <p>Something is going on.</p>
      </div>
    );
  }

});


module.exports = D3PieChart;

