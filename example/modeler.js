'use strict';

import BpmnModeler from 'bpmn-js/lib/Modeler';
import DocViewerModule from '../lib/docviewer';

import fileDrop from 'file-drops';

import exampleXML from './resources/example.bpmn';

const url = new URL(window.location.href);

const persistent = url.searchParams.has('p');

const initialDiagram = (() => {
  try {
    return persistent && localStorage['diagram-xml'] || exampleXML;
  } catch (err) {
    return exampleXML;
  }
})();

function hideDropMessage() {
  const dropMessage = document.querySelector('.drop-message');

  dropMessage.style.display = 'none';
}

if (persistent) {
  hideDropMessage();
}

const ExampleModule = {
  __init__: [
    [ 'eventBus', 'bpmnjs', function(eventBus, bpmnjs) {

      if (persistent) {
        eventBus.on('commandStack.changed', function() {
          bpmnjs.saveXML().then(result => {
            localStorage['diagram-xml'] = result.xml;
          });
        });
      }

    } ]
  ]
};

const modeler = new BpmnModeler({
  container: '#canvas',
  additionalModules: [
    DocViewerModule,
    ExampleModule
  ],
  keyboard: {
    bindTo: document
  }
});

modeler.openDiagram = function(diagram) {
  return this.importXML(diagram)
    .then(({ warnings }) => {
      if (warnings.length) {
        console.warn(warnings);
      }

      if (persistent) {
        localStorage['diagram-xml'] = diagram;
      }

      this.get('canvas').zoom('fit-viewport');
    })
    .catch(err => {
      console.error(err);
    });
};

document.body.addEventListener('dragover', fileDrop('Open BPMN diagram', function(files) {

  // files = [ { name, contents }, ... ]

  if (files.length) {
    hideDropMessage();
    modeler.openDiagram(files[0].contents);
  }

}), false);


modeler.openDiagram(initialDiagram);