var React = require('react');
var D3Group = require('../D3Group.react');
var D3BarAxis = require('../D3BarAxis.react');
var D3BarCell = require('../D3BarCell.react');

var D3BarDataServies = React.createClass({
  propTypes: {
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    data: React.PropTypes.object.isRequired,
    classes:React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
    };
  },

  render: function() {
    var rowData = this.props.data;
    var count = rowData.cells.length;
    var xStart = rowData.cells[0].x;
    var yStart = rowData.cells[0].y;
    var xMax = xStart + this.props.width;
    var yMax = yStart + this.props.height;
    var perCellWidth = this.props.width/count;
    var allHeights = (rowData.cells).map(function(cell, i) {
        return cell.y;
    });

    var bars = (rowData.cells).map(function(cell, i) {
      return (
        <D3BarCell cellX={xStartTemp+perCellWidth*i} cellY={cell.y} cellW={perCellWidth} cellH={0} text={cell.name} textX=  
        {xStartTemp+perCellWidth*(i+1)} rectCss={'cell-rect-'+i} textCss={'cell-text'}/>
      )
    });

    return (
      <D3Group css={this.props.classes['groupClass']}>
        <D3BarAxis xStart={xStart} yStart={yStart} xMax={xMax} yMax={yMax} css={this.props.classes['axisClass']}>
        </D3BarAxis>
        {bars}
        <p>Something is going on.</p>
      </D3Group>
    );
  }

});


module.exports = D3PieChart;