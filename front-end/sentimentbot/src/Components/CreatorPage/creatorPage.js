import React from 'react'
import { Modal, ModalHeader, ModalBody, Button, ModalFooter } from 'reactstrap';
import "./creatorpage.css"
import Happy from "../PNG/nobackgroundHappy.png";
import AustinModal from './austinModal.js';
import JosephModal from './josephModal.js';
import MichelleModal from './michelleModal.js';
import SamuelModal from './samuelModal.js';
import SaniaModal from './saniaModal.js';
import ThomasModal from './thomasModal.js';
import TyroneModal from './tyroneModal.js';

class CreatorPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          modal: false,
        };
    
        this.toggle = this.toggle.bind(this);
      }
    
      toggle() {
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
      }

  render() {
    return (
            <div>
            <img className="creator-button" src={Happy} alt="happy" width="100" height="100" onClick={this.toggle} />
            {/* <Button color="secondary" onClick={this.toggle}>{this.props.buttonLabel}</Button> */}
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
            <ModalHeader toggle={this.toggle}>Meet the Creators</ModalHeader>
            <ModalBody>
              <div className="our-modals">
                <div className="ourmodal-boxes">
                  <h3>Austin</h3><AustinModal />
                </div>
                <div className="ourmodal-boxes">
                  <h3>Joseph</h3><JosephModal />
                </div>
                <div className="ourmodal-boxes">
                  <h3>Michelle</h3><MichelleModal />
                </div>
                <div className="ourmodal-boxes">
                  <h3>Samuel</h3><SamuelModal />
                </div>
                <div className="ourmodal-boxes">
                  <h3>Thomas</h3><ThomasModal />
                </div>
                <div className="ourmodal-boxes">
                  <h3>Tyrone</h3><TyroneModal />
                </div>
                <div className="ourmodal-boxes">
                  <h3>Project Manager Sania</h3><SaniaModal />
                </div>
              </div>
                
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={this.toggle}>Return</Button>
            </ModalFooter>
            </Modal>
            </div>
        );
    }
}

export default CreatorPage;

        // <div className="cp-container">
        //     <NavBar />
        //     <div className="cp-content">
        //         <h1>Meet the Creators</h1>
        //         <div className="creator-box">
        //             <div className="cpbox1">
        //                 <div className="teammemeber">
        //                     <h2>Austin</h2>
        //                     <img src={Austin} width="300" height="300" alt="austin" /> 
        //                 </div>
        //                 <div className="teammemeber">
        //                     <h2>Jospeh</h2>
        //                     <img src={Joseph} width="300" height="300" alt="jospeh" /> 
        //                 </div> 
        //             </div>
        //             <div className="cpbox2">
        //             <div className="teammemeber">
        //                 <h2>Michelle</h2>
        //                 <img src={Michelle} width="300" height="300" alt="michelle" /> 
        //             </div>
        //             <div className="teammemeber">
        //                 <h2>Samuel</h2>
        //                 <img src={Samuel} width="300" height="300" alt="samuel" /> 
        //             </div>
        //             </div>
        //             <div className="cpbox3">
        //             <div className="teammemeber">
        //                 <h2>Thomas</h2>
        //                 <img src={Thomas} width="300" height="300" alt="thomas" /> 
        //             </div>
        //             <div className="teammemeber">
        //                 <h2>Tyrone</h2>
        //                 <img src={Tyrone} width="300" height="300" alt="tyrone" /> 
        //             </div>
        //             </div>
        //             <div className="cpbox4">
        //             <div className="teammemeber">
        //                 <h2>Project Manager Sania</h2>
        //                 <img src={Sania} width="300" height="300" alt="sania" /> 
        //             </div> 
        //             </div>
        //         </div>  
        //     </div>
        // </div>
   
