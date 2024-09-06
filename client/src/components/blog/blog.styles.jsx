import styled from "styled-components";

export const BlogContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 16px;
`;

export const UserName = styled.p`
  color: rgba(128, 128, 128, 0.603);
  text-align: right;
  font-style: italic;
`;

export const BlogTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 20px;
`;

export const BlogContent = styled.div`
  flex-grow: 1;
  overflow-y: auto;
`;
