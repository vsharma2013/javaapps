var React = require('react');
var D3Line = require('../D3Line.react');

var D3BarAxis = React.createClass({
  propTypes: {
    xStart: React.PropTypes.number.isRequired,
    yStart: React.PropTypes.number.isRequired,
    xMax: React.PropTypes.number.isRequired,
    yMax:React.PropTypes.number.isRequired
  },
  getDefaultProps: function() {
    return {
      /*frmStartX:0,
      frmStartY:0*/
    };
  },

  render: function() {
    return (
        <div>
        <D3Line x1={this.props.xStart} y1={this.props.yStart} x2={this.props.xMax} y2={this.props.yStart} className={this.props.css}/>
        <D3Line x1={this.props.xStart} y1={this.props.yStart} x2={this.props.xStart} y2={this.props.yMax} className={this.props.css}/>
        </div>
    );
  }
});

module.exports = D3BarAxis;