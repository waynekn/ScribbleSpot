import styled from "styled-components";

export const FormContainer = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const FormGroup = styled.div`
  margin-bottom: 20px;
`;

export const FormLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
`;

export const FormInput = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  box-sizing: border-box;
  border-bottom: 2px solid #007bff;
  background: transparent;

  &:focus {
    border-bottom: 2px solid #0056b3;
  }
`;

export const FileInput = styled.input`
  margin-top: 8px;
  margin-bottom: 12px;
`;

export const ProfilePicture = styled.img`
  display: block;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-top: 8px;
  margin-bottom: 20px;
`;

export const SubmitButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

export const ErrorMessage = styled.p`
  color: red;
  font-size: 0.875em;
  margin-top: 8px;
`;
