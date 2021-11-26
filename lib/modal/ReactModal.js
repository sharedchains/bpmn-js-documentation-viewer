import React from 'camunda-modeler-plugin-helpers/react';
import { Modal } from 'camunda-modeler-plugin-helpers/components';
import DOMPurify from 'dompurify';

// polyfill upcoming structural components
const Title = Modal.Title || (({ children }) => <h2>{children}</h2>);
const Body = Modal.Body || (({ children }) => <div>{children}</div>);

function createMarkup(text) {
  let cleanDoc = DOMPurify.sanitize(text);
  return { __html: cleanDoc };
}

const ReactModal = (props) => {

  return <Modal onClose={props.close} className="reactModal" id="bootstrapModal">
    <Title>{props.title}</Title>
    <Body>
      <div dangerouslySetInnerHTML={createMarkup(props.documentation)} />
    </Body>
  </Modal>;
};

export default ReactModal;
