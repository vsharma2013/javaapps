var React = require('react');
//var Sector = require('./sector.react');

var D3Group = React.createClass({
  /*propTypes: {
    frmStartX: React.PropTypes.number.isRequired,
    frmStartY: React.PropTypes.number.isRequired,
    css: React.PropTypes.string
  },*/
  getDefaultProps: function() {
    return {
      /*frmStartX:0,
      frmStartY:0*/
    };
  },

  render: function() {
    //var transform = 'translate(' + this.props.frmStartX  + ',' + this.props.frmStartY + ') scale(1, -1)';
    return (
        <g transform={this.props.transform} className={this.props.css}></g>
    );
  }
});

module.exports = D3Group;