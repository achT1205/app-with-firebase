import React, { Component } from 'react';
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
              />
              {
                [1, 2].includes(signInMode) &&
                <MDBInput
                  label="Your password"
                  group
                  name="password"
                  type="password"
                  validate
                  value={credential.password}
                  onChange={handleCredentialChange}
                  containerClass="mb-0"
                />
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
                    <label htmlFor="defaultCheck12" className="grey-text">
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
                <a onClick={() => switchMode(1)} className="blue-text ml-1">
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
                  <MDBIcon icon="facebook" className="blue-text text-center" />
                </MDBBtn>
                <MDBBtn
                  type="button"
                  color="white"
                  rounded
                  className="z-depth-1a"
                >
                  <MDBIcon
                    icon="google-plus"
                    className="blue-text"
                    onClick={() => authenticate("google")}
                  />
                </MDBBtn>
              </div>
            </MDBCardBody>
            {signInMode === 1 &&
              <MDBModalFooter className="mx-5 pt-3 mb-1">
                <p className="font-small grey-text d-flex justify-content-end">
                  Not a member?
                <a onClick={() => switchMode(2)} className="blue-text ml-1">
                    Sign Up
                </a>
                </p>
              </MDBModalFooter>
            }
            {signInMode === 3 &&
              <MDBModalFooter className="mx-5 pt-3 mb-1">
                <p className="font-small grey-text d-flex justify-content-end">
                  <a onClick={() => switchMode(1)} className="blue-text ml-1">
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