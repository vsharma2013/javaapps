var React = require('react');

var D3Line = React.createClass({
  propTypes: {
    x1: React.PropTypes.number.isRequired,
    x2: React.PropTypes.number.isRequired,
    y1: React.PropTypes.number.isRequired,
    y2:React.PropTypes.number.isRequired
  },
  getDefaultProps: function() {
    return {
      /*frmStartX:0,
      frmStartY:0*/
    };
  },

  render: function() {
    return (
        <rect x1={this.props.x1} y1={this.props.y1} x2={this.props.x2} y2={this.props.y2} className={this.props.css}/>
    );
  }
});

module.exports = D3Line;