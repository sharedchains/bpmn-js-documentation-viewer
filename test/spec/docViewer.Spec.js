import Modeler from 'bpmn-js/lib/Modeler';
import DocViewerModule from '../../lib';

import simpleDiagram from '../bpmn/process.bpmn';

import { insertCSS } from 'bpmn-js/test/helper';
import {
  bootstrapModeler,
  inject
} from '../TestHelper';

import { query as domQuery, classes as domClasses } from 'min-dom';

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

      inject(function(eventBus, elementRegistry) {

        // given
        const startEvent = elementRegistry.get('StartEvent');
        expect(startEvent).to.be.not.null;

        done();
      })();
    });

    it('should add the "empty" documentation overlay', done => {

      inject(function(eventBus, elementRegistry, overlays) {

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
          let overlayContainer = ovs[0];
          let overlay = domQuery('div:first-child', overlayContainer.htmlContainer);
          expect(domClasses(overlay).has('full')).to.be.false;

          done();
        }, 1000);
      })();
    });

    it('should add the documentation overlay "not empty"', done => {

      inject(function(create, dragging, eventBus, elementRegistry, overlays) {

        // given
        const endEvent = elementRegistry.get('EndEvent');
        const endEventGfx = elementRegistry.getGraphics('EndEvent');

        // when
        let event = eventBus.createEvent({ element: endEvent, gfx: endEventGfx });
        eventBus.fire('element.hover', event);

        // then
        setTimeout(() => {
          let ovs = overlays.get({ type: 'doc-badge' });
          expect(ovs).to.be.an('array').that.has.length(1);
          let overlayContainer = ovs[0];
          let overlay = domQuery('div:first-child', overlayContainer.htmlContainer);
          expect(domClasses(overlay).has('full')).to.be.true;

          done();
        }, 1000);
      })();
    });
  });

});