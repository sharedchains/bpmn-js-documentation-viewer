import React from 'camunda-modeler-plugin-helpers/react';
import { Modal } from 'camunda-modeler-plugin-helpers/components';
import DOMPurify from 'dompurify';

// polyfill upcoming structural components
const Title = Modal.Title || (({ children }) => <h2>{children}</h2>);
const Body = Modal.Body || (({ children }) => <div>{children}</div>);
const Footer = Modal.Footer || (({ children }) => <div>{children}</div>);

function createMarkup(text) {
  let cleanDoc = DOMPurify.sanitize(text);
  return { __html: cleanDoc };
}

const ReactModal = (props) => {

  return <Modal onClose={props.close} className="reactModal" id="documentationModal">
    <Title>{props.title}</Title>
    <Body>
      <div dangerouslySetInnerHTML={createMarkup(props.documentation)}/>
    </Body>
    <Footer>
      <div>
        <button onClick={props.close} className="btn btn-secondary">Close</button>
      </div>
    </Footer>
  </Modal>;
};

export default ReactModal;
