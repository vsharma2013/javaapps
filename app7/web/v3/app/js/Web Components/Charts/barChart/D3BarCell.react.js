var React = require('react');
var D3Rect = require('../D3Rect.react');
var D3Text = require('../D3Text.react');

var D3BarCell = React.createClass({
  propTypes: {
    cellX: React.PropTypes.number.isRequired,
    cellY: React.PropTypes.number.isRequired,
    cellW: React.PropTypes.number.isRequired,
    cellH:React.PropTypes.number.isRequired,
    text:React.PropTypes.string,
    textX:React.PropTypes.number.isRequired,
    textY:React.PropTypes.number,
    rectCss:React.PropTypes.string,
    textCss:React.PropTypes.string,
    textAnchor:React.PropTypes.string
  },
  getDefaultProps: function() {
    return {
      textY:-10
    };
  },

  render: function() {
    return (
    	<div>
        <D3Rect x={this.props.cellX} y={this.props.cellY} width={this.props.cellW} height={this.props.cellY} className={this.props.rectCss}/>
        <D3Line x={this.props.textX} y={this.props.textY} text={this.props.text} className={this.props.textCss} textAnchor={this.props.textAnchor}/>
        </div>
    );
  }
});

module.exports = D3BarAxis;