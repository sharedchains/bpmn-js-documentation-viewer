import $ from 'jquery';
import { BootstrapModal } from '../modal/BootstrapModal';

export default function DocViewer(eventBus, overlays) {

  const overlayHtml = '<div class="doc-overlay doc-overlay-border"></div>';
  const modalHtml = $('<div class="doc-modal"><div class="doc-modal-content"></div><div class="doc-modal-footer"><button id="doc-close" >Close</button></div></div>');

  let badgeOverlay;
  let modal;

  let onHoverEvent = (event) => {

    // For each shape check check documentation to create the box
    let element = event.element;

    if (element.labelTarget ||
      !element.businessObject.$instanceOf('bpmn:FlowNode')) {
      return;
    }

    setTimeout(() => createDocButton(element), 0);
  };

  function createDocButton(element) {
    let $overlay = $(overlayHtml);

    let documentation = element.businessObject.$attrs['documentation:extendedDocumentation'] || element.businessObject.extendedDocumentation;
    if (documentation && documentation.length > 0) {
      $overlay.addClass('full');
    }

    if (badgeOverlay) {
      overlays.get({
        type: 'doc-badge'
      }).forEach(badge => {
        badge.html.off('click');
      });
      overlays.remove(badgeOverlay);
      badgeOverlay = undefined;
    }

    // attach an overlay to a node
    badgeOverlay = overlays.add(element, 'doc-badge', {
      position: {
        bottom: 0,
        right: 0
      },
      html: $overlay
    });
    if (!window?.components?.Modal && $.fn.modal && typeof ($.fn.modal) === 'function') {
      modal = new BootstrapModal(document.body, documentation);
    }

    $overlay.on('click', (event) => {

      if (window?.components?.Modal) {

        // react component
        if ($(event.target).hasClass('full')) {
          eventBus.fire('open-documentation-modal', {
            element: element,
            doc: documentation
          });
        }

      } else if (typeof ($.fn.modal) === 'function') {

        // bootstrap component
        modal.show();

      } else {

        // NO BOOTSTRAP & NO REACT
        // Show a popup showing the content of bpmn:documentation
        if (documentation && documentation.length > 0) {
          let processElement = getProcessElement(element);
          let $modal = $(modalHtml);
          $modal.find('.doc-modal-content').empty();
          $modal.find('.doc-modal-content').append(documentation);

          let modalOverlay = overlays.add(processElement.id, {
            position: {
              top: 0,
              left: 0
            },
            html: $modal
          });
          $modal.find('#doc-close').on('click', () => {
            overlays.remove(modalOverlay);
          });
        }
      }
      return false;
    });
  }

  eventBus.on('element.hover', onHoverEvent);

  function getProcessElement(element) {
    let bo = element.businessObject || element;
    if (bo && (typeof bo.$instanceOf === 'function') && bo.$instanceOf('bpmn:Definitions')) {
      return element.rootElements[0];
    } else {
      return bo.$parent ? getProcessElement(bo.$parent) : undefined;
    }
  }

}

DocViewer.$inject = ['eventBus', 'overlays'];