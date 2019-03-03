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
import { Element, scroller } from 'react-scroll'


class Chat extends Component {

  constructor(props) {
    super(props);
    this.scrollToTop = this.scrollToTop.bind(this);
  }

  state = {
    conversations: [],
    newMessage: "",
    selectedConversation: null,
    messages: [],
    currentMessages: [],
    announcement: {}
  }
  messagesRef = createRef()

  componentWillReceiveProps(nextProps) {
    if (this.props.user && this.props.user.id) {
      base.listenTo('conversations', {
        context: this,
        asArray: true,
        queries: {
          orderByChild: `messages/?recipientId=${this.props.user.id}&senderId=${this.props.user.id}`,
        },
        then(conversations) {
          if (conversations && conversations.length > 0) {
            this.fetchConversations(conversations, nextProps);
          } else {
            this.initiateConversation();
          }
        }
      })
    }
  }

  initiateConversation() {
    if (this.props.match.params.id) {
      let strs = this.props.match.params.id.split("-");
      base.listenTo(`announcements/${strs[1]}`, {
        context: this,
        then(announcement) {
          if (announcement && announcement.id) {
            base.listenTo(`users/${announcement.owner.id}`, {
              context: this,
              queries: {
                orderByChild: `messages/?recipientId=${this.props.user.id}&senderId=${this.props.user.id}`,
              },
              then(owner) {
                if (owner && owner.id) {
                  let newConversation = {
                    title: announcement.title,
                    id: this.props.match.params.id,
                    senderId: this.props.user.id,
                    recipientId: owner.id,
                    senderName: this.props.user.displayName ? this.props.user.displayName : this.props.user.email,
                    recipientName: owner.displayName,
                    senderAvatar: this.props.user.photoURL,
                    recipientAvatar: owner.photoURL,
                    createAt: Date.now() / 1000 | 0,
                    updatedAt: Date.now() / 1000 | 0,
                    toRespond: 0,
                    seen: true,
                    active: false,
                    messages: [
                      {
                        id: 0,
                        conversationId: this.props.user.id + '-' + announcement.id,
                        senderId: this.props.user.id,
                        recipientId: owner.id,
                        author: this.props.user.displayName,
                        avatar: this.props.user.photoURL,
                        createAt: Date.now() / 1000 | 0,
                        message: "init conversation",
                      }
                    ]
                  }
                  base.post(`/conversations/${this.props.match.params.id}`, {
                    data: newConversation,
                  });
                }
              }
            })
          }
        }
      });
    }
  }
  scrollToTop() {
    scroller.scrollTo('scrollToLastElement', {
      duration: 800,
      delay: 0,
      containerId: "containerElement",
      smooth: 'easeInOutQuart'
    });
  }

  selectConversation = (cvs, id) => {
    let conversations = cvs && cvs.length > 0 ? cvs : this.state.conversations;
    let index = conversations.findIndex(c => c.id === id);
    if (index === -1) {
      this.initiateConversation();
    }
    else {
      conversations.forEach((c) => {
        if (c.id === id) {
          c.active = true;
          if (c.messages &&
            c.messages.length > 0 &&
            c.messages[c.messages.length - 1].recipientId === this.props.user.id &&
            c.toRespond > 0) {
            c.seen = true;
            c.toRespond = 0;
            base.update(`conversations/${id}`, {
              data: c
            });
          }
          if (id && c.id) {
            this.setState({ selectedConversation: c })
          }
        } else {
          c.active = false;
        }
      });
      this.scrollToTop()
    }
  }

  setSelectedConversation = (c) => {
    this.setState({ selectedConversation: c });
  }

  fetchConversations = (array, nextProps) => {
    const { selectedConversation } = this.state;
    if (array && array.length > 0 && this.props.user && this.props.user.id) {
      let cvs = [];
      array.forEach((c) => {
        let currentUserId = this.props.user.id;
        if (c.senderId === currentUserId || c.recipientId === currentUserId) {
          cvs.push(c);
        }
      })
      this.setState({ conversations: cvs });
      let selectedId = '';
      if (nextProps.match.params.id !== this.props.match.params.id) {
        selectedId = nextProps.match.params.id;
      }
      else if (selectedConversation && selectedConversation.id) {
        selectedId = selectedConversation.id
      } else {
        selectedId = this.props.match.params.id;
      }
      this.selectConversation(cvs, selectedId);
    }
  }

  handleInputChange = (event) => {
    this.setState({ newMessage: event.target.value })
  }

  handleOnSubmitForm = (event) => {
    event.persist();
    if (this.state.messages) {
      let message = {
        id: Date.now() / 1000 | 0,
        conversationId: this.state.selectedConversation.id,
        senderId: this.props.user.id,
        recipientId: this.props.user.id === this.state.selectedConversation.recipientId
          ? this.state.selectedConversation.senderId :
          this.state.selectedConversation.recipientId,
        author: this.props.user.displayName,
        avatar: this.props.user.photoURL,
        createAt: Date.now() / 1000 | 0,
        message: this.state.newMessage
      }
      let { selectedConversation } = this.state;
      selectedConversation.toRespond++;
      selectedConversation.seen = false;
      selectedConversation.updatedAt = Date.now() / 1000 | 0;
      selectedConversation.messages.push(message);
      base.update(`/conversations/${this.state.selectedConversation.id}`, {
        data: selectedConversation
      })
      this.setState({ newMessage: "" });
      this.scrollToTop();
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
                  <div >
                    <Element name="test7" className="element" id="containerElement" style={{
                      position: 'relative',
                      height: '300px',
                      marginBottom: '30px',
                      overflowY: 'scroll',
                    }}>
                      {this.state.selectedConversation && this.state.selectedConversation.messages && this.state.selectedConversation.messages.length > 0 &&
                        this.state.selectedConversation.messages.map((message, index) => (
                          <Element name={message.id.toString()}
                            key={message.id}>
                            <ChatMessage
                              message={message}
                              isLast={index === this.state.selectedConversation.messages.length - 1 ? true : false}
                              user={this.props.user}
                            />
                          </Element>
                        ))}
                      <Element name="scrollToLastElement" >
                      </Element>
                    </Element>
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
                      <h4>Select a conversation !</h4>
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