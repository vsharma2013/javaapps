var React = require('react');

var D3Rect = React.createClass({
  propTypes: {
    x: React.PropTypes.number.isRequired,
    y: React.PropTypes.number.isRequired,
    width: React.PropTypes.number.isRequired,
    height:React.PropTypes.number.isRequired
  },
  getDefaultProps: function() {
    return {
      /*frmStartX:0,
      frmStartY:0*/
    };
  },

  render: function() {
    return (
        <rect x={this.props.x} y={this.props.y} width={this.props.width} height={this.props.height} className={this.props.css}/>
    );
  }
});

module.exports = D3Rect;