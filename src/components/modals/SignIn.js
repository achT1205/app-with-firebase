import React, { Component, Fragment } from 'react';
import { Modal, ModalBody, MDBContainer, MDBCardBody, MDBInput, MDBBtn, MDBIcon, MDBModalFooter } from 'mdbreact';

class SignInModal extends Component {
  render() {
    const { modal, toggle, authenticate, credential, handleCredentialChange, handleCredentialCheck, register, switchMode, signInMode, reset } = this.props;
    return (
      <Modal isOpen={modal} toggle={toggle}>
        <ModalBody>
          <MDBContainer>
            <MDBCardBody className="mx-4">
              <div className="text-center">
                <h3 className="dark-grey-text mb-5">
                  {signInMode === 1 && <strong>Sign in</strong>}
                  {signInMode === 2 && <strong>Sign up</strong>}
                  {signInMode === 3 && <strong>Reset password</strong>}
                </h3>
              </div>
              <MDBInput
                label="Your email"
                group
                name="email"
                value={credential.email}
                onChange={handleCredentialChange}
                type="email"
                validate
                error="wrong"
                success="right"
                required
              />
              {
                [1, 2].includes(signInMode) &&
                <Fragment>
                  <MDBInput
                    label="Your password"
                    group
                    name="password"
                    type="password"
                    validate
                    value={credential.password}
                    onChange={handleCredentialChange}
                    containerClass="mb-0"
                    required
                  />
                  {credential.password &&
                    <Fragment>
                      <h6>Your password must contains at least :</h6>
                      <ul className="list-unstyled">
                        <li>
                          {! /[a-z]/.test(credential.password) &&
                            <MDBIcon
                              icon="times-circle-o"
                              className="red-text ml-1"
                              size="sm" />
                          }
                          {/[a-z]/.test(credential.password) &&
                            <MDBIcon
                              icon="check-circle"
                              className="green-text ml-1"
                              size="sm" />
                          }
                          <span className="ml-2">one lowercase alphabetical character</span></li>
                        <li>
                          {! /[A-Z]/.test(credential.password) &&
                            <MDBIcon
                              icon="times-circle-o"
                              className="red-text ml-1"
                              size="sm" />
                          }
                          {/[A-Z]/.test(credential.password) &&
                            <MDBIcon
                              icon="check-circle"
                              className="green-text ml-1"
                              size="sm" />
                          }
                          <span className="ml-2">one uppercase alphabetical character</span></li>
                        <li>
                          {!  /\d/.test(credential.password) &&
                            <MDBIcon
                              icon="times-circle-o"
                              className="red-text ml-1"
                              size="sm" />
                          }
                          {/\d/.test(credential.password) &&
                            <MDBIcon
                              icon="check-circle"
                              className="green-text ml-1"
                              size="sm" />
                          }
                          <span className="ml-2">one numeric character</span></li>
                        <li>
                          {!/[$@$!%*?&\.;]/.test(credential.password) &&
                            <MDBIcon
                              icon="times-circle-o"
                              className="red-text ml-1"
                              size="sm" />
                          }
                          {/[$@$!%*?&\.;]/.test(credential.password) &&
                            <MDBIcon
                              icon="check-circle"
                              className="green-text ml-1"
                              size="sm" />
                          }
                          <span className="ml-2">one special character</span></li>
                        <li>
                          {credential.password.length < 8 &&
                            <MDBIcon
                              icon="times-circle-o"
                              className="red-text ml-1"
                              size="sm" />
                          }
                          {credential.password.length >= 8 &&
                            <MDBIcon
                              icon="check-circle"
                              className="green-text ml-1"
                              size="sm" />
                          }
                          <span className="ml-2">must be eight characters or longer</span></li>
                      </ul>

                    </Fragment>

                  }
                </Fragment>
              }
              {signInMode === 2 &&
                <div className="md-form pb-3">
                  <div className="form-check my-4">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="defaultCheck12"
                      name="act"
                      onChange={handleCredentialCheck}
                      value={credential.act}
                    />
                    <label htmlFor="defaultCheck12" className="grey-text required">
                      Accept the
                    <a href="#!" className="blue-text">
                        Terms and Conditions
                    </a>
                    </label>
                  </div>
                </div>
              }
              {signInMode === 1 &&
                <p className="font-small blue-text d-flex justify-content-end pb-3"
                  onClick={() => switchMode(3)}>
                  Forgot
                <a href="#!" className="blue-text ml-1">
                    Password?
                </a>
                </p>
              }
              {signInMode === 2 &&
                <p className="font-small grey-text d-flex justify-content-end">
                  Have an account?
                <a href="#" onClick={() => switchMode(1)} className="blue-text ml-1">
                    Log in
                </a>
                </p>
              }
              <div className="text-center mb-3">
                {signInMode === 1 && <MDBBtn
                  type="button"
                  gradient="blue"
                  rounded
                  className="btn-block z-depth-1a"
                  onClick={authenticate}
                >
                  Sign in
                </MDBBtn>}
                {signInMode === 2 && <MDBBtn
                  type="button"
                  gradient="blue"
                  rounded
                  className="btn-block z-depth-1a"
                  onClick={register}
                >
                  Sign up
                </MDBBtn>}
                {signInMode === 3 && <MDBBtn
                  type="button"
                  gradient="blue"
                  rounded
                  className="btn-block z-depth-1a"
                  onClick={reset}
                >
                  Reset
                </MDBBtn>}
              </div>
              <p className="font-small dark-grey-text text-right d-flex justify-content-center mb-3 pt-2">

                or Sign in with:
              </p>
              <div className="row my-3 d-flex justify-content-center">
                <MDBBtn
                  type="button"
                  color="white"
                  rounded
                  className="mr-md-3 z-depth-1a"
                  onClick={() => authenticate("facebook")}
                >
                  <MDBIcon icon="facebook"
                   className="blue-text text-center" />
                </MDBBtn>
                <MDBBtn
                  type="button"
                  color="white"
                  rounded
                  className="z-depth-1a"
                  onClick={() => authenticate("google")}
                >
                  <MDBIcon
                    icon="google-plus"
                    className="blue-text"
                  />
                </MDBBtn>
              </div>
            </MDBCardBody>
            {signInMode === 1 &&
              <MDBModalFooter className="mx-5 pt-3 mb-1">
                <p className="font-small grey-text d-flex justify-content-end">
                  Not a member?
                <a href="#" onClick={() => switchMode(2)} className="blue-text ml-1">
                    Sign Up
                </a>
                </p>
              </MDBModalFooter>
            }
            {signInMode === 3 &&
              <MDBModalFooter className="mx-5 pt-3 mb-1">
                <p className="font-small grey-text d-flex justify-content-end">
                  <a href="#" onClick={() => switchMode(1)} className="blue-text ml-1">
                    Sign in now !
                </a>
                </p>
              </MDBModalFooter>
            }
          </MDBContainer>
        </ModalBody>
      </Modal>
    );
  }
}

export default SignInModal