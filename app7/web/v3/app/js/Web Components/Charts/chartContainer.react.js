var React = require('react');
var chartCont = React.createClass({
  propTypes: {
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
    left:React.PropTypes.number.isRequired,
    top:React.PropTypes.number.isRequired,
    children: React.PropTypes.node,
  },
  render: function() {
    return (
      <svg width={this.props.width} height={this.props.height} left={this.props.left} right={this.props.right}>        
      {this.props.children}</svg>
    );
  }
});


module.exports = chartCont;