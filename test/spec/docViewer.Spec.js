import Modeler from 'bpmn-js/lib/Modeler';
import DocViewerModule from '../../lib';

import simpleDiagram from '../bpmn/process.bpmn';

import { insertCSS } from 'bpmn-js/test/helper';
import {
  bootstrapModeler,
  inject,
  createCanvasEvent
} from '../TestHelper';

import {
  attr as svgAttr,
  clone as svgClone,
  innerSVG
} from 'tiny-svg';

insertCSS(
  'diagram.css',
  require('bpmn-js/dist/assets/diagram-js.css')
);

insertCSS(
  'bpmn-font.css',
  require('bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css')
);


describe('DocViewer tests', function() {

  function bootstrapDiagram(diagram) {
    beforeEach(bootstrapModeler(diagram, {
      additionalModules: [].concat(Modeler.prototype._modules).concat([
        DocViewerModule
      ]),
      keyboard: {
        bindTo: document
      }
    }));
  }

  describe('Loading diagram', () => {
    bootstrapDiagram(simpleDiagram);

    it('should extend BpmnModeler instance', done => {

      inject(function(eventBus, elementRegistry, overlays, canvas) {

        // given
        const startEvent = elementRegistry.get('StartEvent');
        expect(startEvent).to.be.not.null;

        done();
      })();
    });

    it('should add the documentation overlay', done => {

      inject(function(create, dragging, eventBus, elementRegistry, overlays, canvas) {

        // given
        const startEvent = elementRegistry.get('StartEvent');
        const startEventGfx = elementRegistry.getGraphics('StartEvent');

        // when
        let event = eventBus.createEvent({ element: startEvent, gfx: startEventGfx });
        eventBus.fire('element.hover', event);

        // then
        setTimeout(() => {
          let ovs = overlays.get({ type: 'doc-badge' });
          expect(ovs).to.be.an('array').that.has.length(1);

          done();
        }, 1000);
      })();
    });
  });

});