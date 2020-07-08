import React, { Component, Fragment } from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput, MDBIcon, MDBAnimation } from 'mdbreact';
import EailSuccess from '../emailSuccess.png'
export class UserForm extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            email : "",
            emailErr: false,
            subject: "",
            subjectErr: false,
            message: "",
            messageErr: false,
            validate: false,
            loading: false
        }
    }
    
    emailHandler = (event) => {
        this.setState({
            email : event.target.value
        }, this.validateEmail)
    }

    validateEmail = () => {
        const {email} = this.state
        
        if(email && email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)){
            this.setState({
                emailErr: false
            },this.validateForm)
        }else{
            this.setState({
                emailErr: true
            },this.validateForm)
        }
    }

    subjectHandler = (event) => {
        this.setState({
            subject : event.target.value
        }, this.validateSubject)
    }

    validateSubject = () => {
        const { subject } = this.state
        if(subject && subject.length >= 3){
            this.setState({
               subjectErr:false
            }, this.validateForm) 
        }else{
            this.setState({
                subjectErr:true
            }, this.validateForm)
        }
    }

    messageHandler = (event) => {
        this.setState({
            message : event.target.value
        }, this.validateMessage)
    }

    validateMessage = () => {
        const { message } = this.state
        if(message && message.length >= 3){
            this.setState({
               messageErr:false
            }, this.validateForm) 
        }else{
            this.setState({
                messageErr:true
            }, this.validateForm)
        }
    }

    resetState = () => {
        this.setState({
            email : "",
            emailErr: false,
            subject: "",
            subjectErr: false,
            message: "",
            messageErr: false,
            validate: false,
            loading: false
        })
    }
    
    validateForm = () => {
        const {emailErr, subjectErr, messageErr, email, subject, message} = this.state
        if( email && subject && message && !emailErr && !subjectErr && !messageErr){
            this.setState({
                validate:true
            })
        }else{
            this.setState({
                validate:false
            })
        }
    }
    submitForm = (e) => {
        e.preventDefault()
        this.setState({
            loading: 'Spinner'
        }, this.setLoaderToSuccess)
        setTimeout(() => { this.setState({
            loading: false
        }) }, 3000);
    }

    setLoaderToSuccess = () => {
        setTimeout(() => { this.setState({
            loading: 'Success'
        }, this.resetAfterDelay(3000)) }, 3000);
    }
    
    resetAfterDelay = (delay) => {
        setTimeout(this.resetState, delay)
    }

    render() {
        return (
            <Fragment >
                <MDBContainer>
                    <MDBRow>
                        <MDBCol md="12">
                        <form onSubmit={this.submitForm}>
                        <h4 style={{ display: "flex", justifyContent: "center", alignItems: "center", background: "#dc3545e6", color: "#ffffffba", fontSize: "20px", height: "30px" }} >Send New Email</h4>
                        <div className="form">   
                            
                            <div className="grey-text">
                                <MDBInput label="To:" className={`${this.state.emailErr ? 'is-invalid' : ''}`} icon="user" value={this.state.email} onChange={this.emailHandler} type="email" />
                                <MDBInput label="Subject:" className={`${this.state.subjectErr ? 'is-invalid' : ''}`} icon="envelope" value={this.state.subject} onChange={this.subjectHandler} type="text" />
                                <MDBInput label="Message" icon="envelope-open" className={`${this.state.messageErr ? 'is-invalid' : ''}`} value={this.state.message} onChange={this.messageHandler} type="text"/>
                            </div>
                            { (this.state.loading && this.state.loading === 'Spinner') ?
                               <div className="text-center">
                                    <div className="spinner-border text-primary"  role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </div> : (this.state.loading && this.state.loading === 'Success') ?
                                <div className="text-center">
                                    <MDBAnimation type="fadeIn" infinite duration="2000ms">
                                        <img src={EailSuccess} alt='Email Success' />
                                    </MDBAnimation>
                                </div> : null  
                            }   
                            <div>
                                <span >
                                   <MDBBtn type="submit" disabled={!this.state.validate} size="sm">Send <MDBIcon icon="paper-plane" className="ml-2" /></MDBBtn>
                                </span>
                                <span className="float-right">
                                    <MDBBtn color="primary" onClick={this.resetState} size="sm">Reset <MDBIcon icon="trash-alt" className="ml-2" /></MDBBtn>
                                </span>    
                            </div>
                        </div>    
                        </form>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </Fragment>        
        )
    }
}

export default UserForm
