'use strict';

var assign = require('lodash/object/assign'),
    forEach = require('lodash/collection/forEach');

function SetElementColorHandler(commandStack) {
  this._commandStack = commandStack;
}

SetElementColorHandler.$inject = [ 'commandStack' ];

module.exports = SetElementColorHandler;

SetElementColorHandler.prototype.postExecute = function(context) {
  var elements = context.elements;

  var that = this;

  var di = {};

  if ('fill' in context) {
    assign(di, { fill: context.fill });
  }

  if ('stroke' in context) {
    assign(di, { stroke: context.stroke });
  }

  forEach(elements, function(element) {
    that._commandStack.execute('element.updateProperties', {
      element: element,
      properties: {
        di: di
      }
    });
  });

};

SetElementColorHandler.prototype.execute = function(context) {};

SetElementColorHandler.prototype.revert = function(context) {};
