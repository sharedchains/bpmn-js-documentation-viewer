import 'bootstrap';

export default function bsModal(doc) {

  // empty modal appended to body - BOOTSTRAP VERSION
  let newmodal = document.createElement('div');
  newmodal.classList.add('modal');
  newmodal.classList.add('fade');
  newmodal.setAttribute('id', 'myModal');
  newmodal.setAttribute('role', 'dialog');
  let bModal = '<div class="modal-dialog modal-fullscreen" id="modalDoc" style="width: 95%; margin: auto;">' +
        '<div class="modal-content">' +
        '<div class="modal-header">' +
        '<button type="button" class="close" data-dismiss="modal">&times;</button>' +
        '</div>' +
        '<div class="modal-body">'+doc+'</div>' +
        '</div>' +
        '</div>';
  newmodal.innerHTML = bModal;
  return newmodal;
}
