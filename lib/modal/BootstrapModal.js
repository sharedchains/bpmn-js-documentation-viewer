import { Modal } from './Modal';
import $ from 'jquery';

import 'bootstrap';

export class BootstrapModal extends Modal {

  constructor(container, documentation) {
    super(documentation);

    function getEmptyModal() {

      // empty modal appended to body - BOOTSTRAP VERSION
      let newmodal = document.createElement('div');
      newmodal.classList.add('modal');
      newmodal.classList.add('fade');
      newmodal.setAttribute('id', 'bootstrapModal');
      newmodal.setAttribute('role', 'dialog');
      newmodal.innerHTML = '<div class="modal-dialog modal-fullscreen" id="modalDoc" style="width: 95%; margin: auto;">' +
        '<div class="modal-content">' +
        '<div class="modal-header">' +
        '<button type="button" class="close" data-dismiss="modal">&times;</button>' +
        '</div>' +
        '<div class="modal-body"></div>' +
        '</div>' +
        '</div>';
      return newmodal;
    }

    this.container = container;
    container.appendChild(getEmptyModal());
  }

  show() {
    if (this.documentation && this.documentation.length > 0) {
      let body = $('.modal-body');
      body.empty();
      body.append(this.documentation);
      $('#bootstrapModal').modal('show');
    }
  }
}