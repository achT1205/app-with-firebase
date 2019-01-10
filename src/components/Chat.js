import React, { Component, createRef, Fragment } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBRow,
  MDBCol,
  MDBListGroup,
  MDBBtn,
  MDBScrollbar
} from "mdbreact";
import './chat.css';
import withAuthentication from '../hoc/withAuthentication'
import Conversation from './Conversation'
import ChatMessage from './ChatMessage'
import base from '../base'
import { DateTime } from "luxon";

class Chat extends Component {
  state = {
    conversations: [],
    newMessage: "",
    selectedConversation: null,
    messages: [],
    currentMessages: []
  }
  messagesRef = createRef()

  componentDidMount() {
    base.listenTo('conversations', {
      context: this,
      asArray: true,
      then(conversations) {
        this.fetchConversations(conversations);
      }
    })
  }

  componentDidUpdate() {
    const ref = this.messagesRef.current
    if (ref) {
      ref.scrollTop = ref.scrollHeight
    }
  }

  selectConversation = (id) => {
    let conversations = this.state.conversations;
    conversations.forEach((c) => {
      if (c.id === id) {
        c.active = true;
        if (c.toRespond > 0) {
          c.seen = true;
          c.toRespond = 0;
          base.update(`conversations/${id}`, {
            data: c
          });
        }
        this.setState({ selectedConversation: c })
      } else {
        c.active = false;
      }
    });

    this.setState({ conversations })
  }

  setSelectedConversation = (c) => {
    this.setState({ selectedConversation: c });
  }

  fetchConversations = (conversations) => {
    const { selectedConversation } = this.state;
    if (conversations && conversations.length > 0 && this.props.user && this.props.user.id) {
      let cvs = [];
      conversations.forEach((c) => {
        let currentUserId = this.props.user.id;
        if (c.senderId === currentUserId || c.recipientId === currentUserId) {
          let selectedId = selectedConversation && selectedConversation.id ? selectedConversation.id : this.props.match.params.id;
          if (c.id === selectedId) {
            c.active = true;
            this.setState({ selectedConversation: c });
          } else {
            c.active = false;
          }
          cvs.push(c);
        }
      })
      this.setState({ conversations: cvs });
      if (selectedConversation && selectedConversation.id) {
        let updateds = conversations.filter(c => c.id === selectedConversation.id);
        if (selectedConversation !== updateds[0]) {
          this.setState({ selectedConversation: updateds[0] });
        }
      }
    }
  }

  handleInputChange = (event) => {
    this.setState({ newMessage: event.target.value })
  }

  handleOnSubmitForm = (event) => {
    event.persist();
    if (this.state.messages) {
      let message = {
        id: Date.now(),
        conversationId: this.state.selectedConversation.id,
        senderId: this.props.user.id,
        recipientId: this.props.user.id === this.state.selectedConversation.recipientId
          ? this.state.selectedConversation.senderId :
          this.state.selectedConversation.recipientId,
        author: this.props.user.displayName,
        avatar: this.props.user.photoURL,
        createAt: DateTime.local().setLocale('en-gb').toLocaleString(DateTime.DATETIME_SHORT),
        message: this.state.newMessage
      }
      let { selectedConversation } = this.state;
      selectedConversation.toRespond++;
      selectedConversation.seen = false;
      selectedConversation.messages.push(message);
      base.update(`/conversations/${this.state.selectedConversation.id}`, {
        data: selectedConversation
      })
      this.setState({ newMessage: "" })
    }
  }

  hasMessage = (conversation) => {
    const userId = this.props.user.id;
    if (conversation.recipientId === userId && conversation.messages.length === 1) {
      return false;
    }
    return true;
  }


  render() {
    return (
      <Fragment>
        {this.state.conversations && this.state.conversations.length > 0 &&
          <MDBCard className="grey lighten-3 chat-room">
            <MDBCardBody>
              <MDBRow className="px-lg-2 px-2">
                <MDBCol md="6" xl="4" className="px-0 mb-4 mb-md-0 scrollable-friends-list">
                  <h6 className="font-weight-bold mb-3 text-lg-left">Chat</h6>
                  {(this.state.conversations.some(this.hasMessage)) &&
                    <MDBScrollbar>
                      <div className="white z-depth-1 p-3">
                        <MDBListGroup className="friend-list">
                          {this.state.conversations.map(conversation => (
                            <Conversation
                              key={conversation.id}
                              conversation={conversation}
                              selectConversation={this.selectConversation}
                              user={this.props.user} />
                          ))}
                        </MDBListGroup>
                      </div>
                    </MDBScrollbar>
                  }
                </MDBCol>
                <MDBCol md="6" xl="8" className="pl-md-3 mt-4 mt-md-0 px-lg-auto">
                  <div className="scrollable-chat" ref={this.messagesRef}>
                    <MDBScrollbar>
                      <MDBListGroup className="list-unstyled pl-3 pr-3" >
                        {this.state.selectedConversation && this.state.selectedConversation.messages && this.state.selectedConversation.messages.length > 0 &&
                          this.state.selectedConversation.messages.map((message, index) => (
                            <ChatMessage
                              key={message.id}
                              message={message}
                              isLast={index === this.state.selectedConversation.messages.length - 1 ? true : false}
                              user={this.props.user}
                            />
                          ))}
                      </MDBListGroup>
                    </MDBScrollbar>
                  </div>
                  <div className="form-group basic-textarea">
                    {this.state.selectedConversation && this.state.selectedConversation.id &&
                      <form>
                        <textarea
                          className="form-control pl-2 my-0"
                          id="exampleFormControlTextarea2"
                          rows="3"
                          name="newMessage"
                          placeholder="Type your message here..."
                          value={this.state.newMessage}
                          onChange={this.handleInputChange}
                        />
                        <MDBBtn
                          color="info"
                          rounded
                          size="sm"
                          className="float-right mt-4"
                          onClick={this.handleOnSubmitForm}
                        >
                          Send
                       </MDBBtn>
                      </form>
                    }
                    {(!this.state.selectedConversation || !this.state.selectedConversation.id) &&
                      <h4>Your didn't initiate any chat yet !</h4>
                    }
                  </div>
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBCard>
        }
        {(this.state.conversations && this.state.conversations.length === 0) &&
          <div className="mt-5">
            <h4>Your didn't initiate any chat yet !</h4>
          </div>
        }
      </Fragment>
    );
  }
}
const WrappedChat = withAuthentication(Chat)
export default WrappedChat;