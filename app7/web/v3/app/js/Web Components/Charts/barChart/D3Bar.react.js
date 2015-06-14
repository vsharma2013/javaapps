var React = require('react');
var chartContainer = require('../chartContainer.react');
var DataSeries = require('../D3Chart.react');
//var TodoActions = require('../actions/TodoActions');
//var TodoTextInput = require('./TodoTextInput.react');


var D3BarChart = React.createClass({
  propTypes: {
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    top:React.propTypes.number,
    left:React.propTypes.number,
    data: React.PropTypes.object.isRequired,
    classes:React.PropTypes.object
  },
  //{'groupClass':'','axisClass':''}
  getDefaultProps: function() {
    return {
      width: 300,
      height: 350,
      left:300,
      top:0,
      title: '',
      Legend: true,
    };
  },

  render: function() {
    var chartWidth = 0.8 * width;
    var chartHeight = 0.8 * height;
    return (
      <chartContainer width={this.props.width} height={this.props.width} left={this.props.left} top={this.props.top}>
        <D3Chart width={this.props.width} height={this.props.height}>
         /*<DataSeries data={this.props.data} colors={colors} width={this.props.width} height={this.props.height}>
         </DataSeries>*/
        </D3Chart>
        <p>Something is going on.</p>
      </chartContainer>
    );
  }

});


module.exports = D3PieChart;

