'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = generateID;

var COUNT = 0;

function generateID() {
  var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'unique_id_';

  return '' + prefix + COUNT++;
}