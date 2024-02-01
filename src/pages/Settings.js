import React, { useState } from "react";
import styled from "styled-components";

const Button = styled.button`
  background-color: #4caf50;
  color: #fff;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-bottom: 20px;

  &:hover {
    background-color: #45a049;
  }
`;

const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
`;

const ModalContainer = styled.div`
  max-width: 800px;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  color: #333;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 8px;
  display: block;
`;

const Input = styled.input`
  width: 100%;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`;

const SubmitButton = styled.button`
  background-color: #4caf50;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #45a049;
  }
`;

const CloseButton = styled.button`
  background-color: #ccc;
  color: #333;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 10px;
  margin-left: 300px;

  &:hover {
    background-color: #bbb;
  }
`;

const Settings = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [contact, setContact] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword1, setNewPassword1] = useState("");
  const [newPassword2, setNewPassword2] = useState("");

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", {
      fullName,
      username,
      contact,
      oldPassword,
      newPassword1,
      newPassword2,
    });
    closeModal();
  };

  return (
    <div className="settings">
      <div className="profile-card">
        <img
          src="https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg"
          alt="Profile"
          className="profile-photo"
        />
        <div className="profile-details">
          <h2 className="full-name">Dinesh Paudel</h2>
          <p className="username">paudeldinesh@gmail.com</p>
          <p className="contact-info">9847503434</p>
          <Button onClick={openModal}>Change Password</Button>
        </div>
      </div>

      {modalIsOpen && (
        <ModalWrapper>
          <ModalContainer>
            <CloseButton onClick={closeModal}>X</CloseButton>
            <Title>Change Password</Title>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="fullName">Full Name:</Label>
                <Input
                  type="text"
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="username">Username:</Label>
                <Input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="contact">Contact:</Label>
                <Input
                  type="tel"
                  id="contact"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="oldPassword">Old Password:</Label>
                <Input
                  type="password"
                  id="oldPassword"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="newPassword1">New Password:</Label>
                <Input
                  type="password"
                  id="newPassword1"
                  value={newPassword1}
                  onChange={(e) => setNewPassword1(e.target.value)}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="newPassword2">Confirm New Password:</Label>
                <Input
                  type="password"
                  id="newPassword2"
                  value={newPassword2}
                  onChange={(e) => setNewPassword2(e.target.value)}
                  required
                />
              </FormGroup>

              <SubmitButton type="submit">Change Password</SubmitButton>
            </Form>
          </ModalContainer>
        </ModalWrapper>
      )}
    </div>
  );
};

export default Settings;
