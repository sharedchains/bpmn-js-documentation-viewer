import React, { Fragment, Component } from 'camunda-modeler-plugin-helpers/react';
import ReactModal from './ReactModal';

const defaultState = {
  modalOpen: false,
  documentation: null
};

export default class ReactModalFragment extends Component {

  constructor(props) {
    super(props);
    this.state = defaultState;
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount(){
    const{
      subscribe
    } = this.props;
    //on mouse hover getting the documentation
    subscribe('bpmn.modeler.created', ({ modeler }) => {
      this._eventBus = modeler.get('eventBus');
      this._eventBus.on("docshow", (event) => {
        //get the documentation
        let element = event.element;
        if (element.labelTarget || !element.businessObject.$instanceOf('bpmn:FlowNode')) {
          //!--stop all--!
          this.setState({
            ...defaultState
          });
        }else{
          //modify the state
          this.setState({
            modalOpen: true,
            documentation: event.doc
          });
        }
      });

    });

  }

  closeModal(){
    this.setState({
      ...defaultState
    });
  }

  render() {
    const { modalOpen, documentation } = this.state;

    return <Fragment>
      {modalOpen && (
        <ReactModal documentation={documentation} close={this.closeModal} title='Documentation'/>
      )}
    </Fragment>;
  }

}

