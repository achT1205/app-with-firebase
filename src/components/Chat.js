import React, { Component, createRef, Fragment } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBRow,
  MDBCol,
  MDBListGroup,
  MDBListGroupItem,
  MDBAvatar,
  MDBBadge,
  MDBIcon,
  MDBBtn,
  MDBScrollbar
} from "mdbreact";
import './chat.css';
import withAuthentication from '../hoc/withAuthentication'
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
    if (this.props.user && this.props.user.id) {
      base.listenTo('conversations', {
        context: this,
        asArray: true,
        then(conversations) {
          this.fetchConversations(conversations);
        }
      })

    }
  }

  componentDidUpdate() {
    if (this.state.conversations.length > 0 && !this.state.selectedConversation && this.props.match.params.id) {
      this.selectConversation(this.props.match.params.id);
    }
    const ref = this.messagesRef.current
    if (ref) {
      ref.scrollTop = ref.scrollHeight
    }
  }

  selectConversation = (id) => {
    this.state.conversations.forEach((c) => {
      if (c.id === id) {
        c.active = true;
        /*
        if (c.toRespond > 0) {
        c.toRespond = 0;
          base.update(`/conversations/${id}`, {
            data: c
          })
        };*/
        this.setState({ selectedConversation: c });
      }
      else {
        c.active = false;
      }
    })
  }

  fetchConversations = (conversations) => {
    const { selectedConversation } = this.state;
    if (conversations && conversations.length > 0) {
      let cvs = [];
      conversations.forEach((c) => {
        if (c => c.senderId === this.props.user.id || c.recipientId === this.props.user.id) {
          if (selectedConversation && selectedConversation.id && c.id === selectedConversation.id) {
            c.active = true;
          } else {
            c.active = false;
          }
          cvs.push(c);
        }
      })
      this.setState({ conversations: cvs });
      if (selectedConversation && selectedConversation.id) {
        let updateds = conversations.filter(c => c.id === selectedConversation.id);
        debugger;
        if (selectedConversation !== updateds[0]) {
          debugger
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
    if (conversation.messages.length === 1 && conversation.recipientId === this.props.user.id)
      return false;
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
                  {(this.state.conversations.every(this.hasMessage)) &&
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
        {(!this.state.conversations || this.state.conversations.length === 0) &&
          <div className="mt-5">
            <h4>Your didn't initiate any chat yet !</h4>
          </div>
        }
      </Fragment>
    );
  }
}

const Conversation = ({
  conversation: { id, senderName, recipientId, senderAvatar, recipientName, recipientAvatar, messages, createAt, toRespond, seen, active }, selectConversation, user
}) => (
    <Fragment>
      {(user.id === recipientId && messages.length > 1 || user.id !== recipientId) &&
        <MDBListGroupItem
          href="#!"
          className="d-flex justify-content-between p-2 border-light"
          style={{ backgroundColor: active ? "#eeeeee" : "" }}
          onClick={() => selectConversation(id)}
        >
          <MDBAvatar
            tag="img"
            src={user.id === recipientId ? senderAvatar : recipientAvatar}
            alt="avatar"
            circle
            className="mr-2 z-depth-1"
          />
          <div style={{ fontSize: "0.95rem" }}>
            <strong>{user.id === recipientId ? senderName : recipientName}</strong>
            {messages.length > 1 &&
              <p className="text-muted">{messages[messages.length - 1].message.substring(0, 10) + "..."}</p>
            }
          </div>
          <div>
            <p className="text-muted mb-0" style={{ fontSize: "0.75rem" }}>
              {createAt}
            </p>
            {messages.length > 1 &&
              <Fragment>
                {messages[messages.length - 1].senderId === user.id &&
                  <span className="text-muted float-right">
                    <MDBIcon className="fa-mail-reply" aria-hidden="true" />
                  </span>
                }
                {messages[messages.length - 1].recipientId === user.id &&
                  <Fragment>
                    {seen &&
                      <span className="text-muted float-right">
                        <MDBIcon className="fa-check" aria-hidden="true" />
                      </span>
                    }
                    {!seen && toRespond > 0 &&
                      <MDBBadge color="danger" className="float-right">
                        {toRespond}
                      </MDBBadge>
                    }
                    {!seen && toRespond == 0 &&
                      <span className="text-muted float-right">
                        <MDBIcon className="fa-mail-reply" aria-hidden="true" />
                      </span>
                    }
                  </Fragment>
                }
              </Fragment>
            }
          </div>
        </MDBListGroupItem>

      }
    </Fragment>
  );

const ChatMessage = ({ message: { id, author, avatar, createAt, message }, isLast, user }) => (
  <Fragment>
    {id !== 0 &&
      <li className="chat-message d-flex justify-content-between mb-4">
        <MDBAvatar
          tag="img"
          src={avatar}
          alt="avatar"
          circle
          className="mx-2 z-depth-1"
        />
        <MDBCard>
          <MDBCardBody>
            <div>
              <strong className="primary-font">{author}</strong>
              <small className="pull-right text-muted">
                <i className="fa fa-clock-o" /> {createAt}
              </small>
            </div>
            <hr />
            <p className="mb-0">{message}</p>
          </MDBCardBody>
        </MDBCard>
      </li>
    }
  </Fragment>
);

const WrappedChat = withAuthentication(Chat)
export default WrappedChat;