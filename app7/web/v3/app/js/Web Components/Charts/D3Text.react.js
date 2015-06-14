var React = require('react');
var D3Group = require('./D3Group.react');

var D3Text = React.createClass({
  propTypes: {
    x: React.PropTypes.number.isRequired,
    y: React.PropTypes.number.isRequired,
    text: React.PropTypes.string
  },
  getDefaultProps: function() {
    return {
      'css':col-text,
      'textAnchor':'middle'
    };
  },

  render: function() {
    var transform = 'scale(1, -1)';
    return (
        <D3Group transform={transform}>
          <text x={this.props.x} y={this.props.y} classname={this.props.css} text-anchor={this.props.textAnchor}>
          {this.props.text}
          </text>
        </D3Group>
    );
  }
});

module.exports = D3Group;