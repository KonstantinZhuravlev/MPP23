import React, { Component } from 'react';
import Profile from './profile';
import '../css/DataField.css';
import { serverAddress } from '../extraFiles/serverAddressInfo';
import Converter from "../extraFiles/converter.js";

class DataField extends Component {

    state = { 
        messages: [],       
        lastMessageIndex: 0,
        messageText: "",
        sendMessageInterval: null,
    }

    componentDidMount(){    
        this.sendMessageInterval = setInterval(() => {
            fetch(`${serverAddress}/chat/messages?msgIndex=${this.state.lastMessageIndex}`,{ 
                credentials: 'include' 
            })
            .then((res) => {
                if(res.status === 401) return null;
                return res.json();      
            })
            .then(res => {
                if(!res) {
                    this.props.unauthorizedCodeWasReceived();
                    return this.stopSendMessageInterval();
                }
                const newState = this.state;
                newState.lastMessageIndex = res.data.last_index;
                newState.messages = this.state.messages.concat(res.data.messages);
                this.setState(newState);
            });
        }, 3000);

        // this.props.getMessageRequest();

        // this.scrollToBottom();
    }

    stopSendMessageInterval = () => {
        clearInterval(this.sendMessageInterval);
    }

    // componentDidUpdate() {
    //     this.scrollToBottom();
    // }
    
    // scrollToBottom = () => {
    //     this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    // } 

    render() { 
        return ( 
            <div className="data-field">
                { this.renderUserProfile() }
                { this.renderMessagesListBox() }
                { this.renderMessageInputBox() }
            </div>
        );
    }

    renderMessageInputBox = () => {

        if(this.props.currentWindow === "chat") 
            return (
                <div className="send-msg-area">
                    <form>
                        <div className="send-msg-input">
                            <input className="form-control" 
                                type="text" name="message_text"
                                value={this.state.messageText} onChange={ this.handleMsgTextChange }/>
                        </div>
                        <div className="send-msg-btn">
                            <input type="button" 
                                className="btn btn-dark" value="Send" 
                                name="message_send_btn" onClick={ this.handleSendMsgButtonClick }/>
                        </div>
                    </form>
                </div>
            );
    }

    renderUserProfile = () => {
        if(this.props.currentWindow === "profile"){
            return (
                <Profile currentUser={ this.props.currentUser }/>
            );
        }
    }

    renderMessagesListBox = () => {
        if(this.props.currentWindow === "chat"){
            return (
                <div className="message-list-box">
                    <div className="message-list-area">
                        { this.renderMessagesList() }
                    </div>
                </div>
            );
        }
    }

    // delete  dummy message box later 
    renderMessagesList = () => {
        return (
            <ul>
                {this.renderListItems()}
                <li key={"100000"}className="dummy-msb-box" ref={(el) => { this.messagesEnd = el; }}>
                </li>
            </ul>
        );
    }

    renderListItems = () => {
        return this.state.messages.map( (message) => {
            return (
                <li key={message.index}>
                    <div className="message-box">
                        <div className="message-content">
                            <div className="card bg-light mb-3">
                                <div className="card-header">
                                    <div className="message-sender-avatar">
                                        {/* <img alt=""  src={`data:image/jpg;base64,${Converter.arrayBufferToBase64(message.sendfer.img)}`}/> */}
                                        <img alt="" src='https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'/>
                                    </div>
                                    <span>{`${message.sender.name} ${message.sender.surname}`}</span>
                                </div>
                                <div className="card-body">
                                    <div className="card-text">
                                        <span>{message.text}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            );
        })
    }

    handleMsgTextChange = (event) => {
        const newState = this.state;
        newState.messageText = event.target.value;
        this.setState(newState);
    }

    handleSendMsgButtonClick = () => {

        if(this.state.messageText.length === 0) return;
        
        const requestOptions = {
            method: 'POST',
            credentials: "include",
        };

        fetch(`${serverAddress}/chat/messages/send?id=${this.props.currentUser.id}&name=${this.props.currentUser.name}&surname=${this.props.currentUser.surname}&msg=${this.state.messageText}`, requestOptions)
        .then(response => {
            if(response.status === 401){
                return null
            }
            return response.json()
        })
        .then(data => {
            if(!data) {
                this.props.unauthorizedCodeWasReceived();
                return this.stopSendMessageInterval();
            }
            const newState = this.state;
            newState.messageText = "";
            this.setState(newState);
        });
    }
}

export default DataField;