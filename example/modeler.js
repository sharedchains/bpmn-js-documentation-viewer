'use strict';

import BpmnModeler from 'bpmn-js/lib/Modeler';
import DocViewerModule from '../lib';

import exampleXML from './resources/example.bpmn';

var modeler = new BpmnModeler({
  container: '#canvas',
  additionalModules: [].concat(BpmnModeler.prototype._modules).concat([
    DocViewerModule
  ]),
  keyboard: {
    bindTo: document
  }
});

modeler.importXML(exampleXML)
  .then(({ warnings }) => {
    if (warnings.length) {
      console.warn(warnings);
    }

    modeler.get('canvas').zoom('fit-viewport');

    window.modeler = modeler;
  })
  .catch(err => {
    console.err(err);
  });