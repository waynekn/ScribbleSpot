import styled from "styled-components";

export const BlogContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const AuthorInfo = styled.div`
  margin-bottom: 10px;
  font-size: 1rem;
  color: #333;
`;

export const AuthorLink = styled.span`
  color: #007bff;
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    color: #0056b3;
  }
`;

export const MetaContainer = styled.div`
  display: flex;
  justify-content: space-between; // Space between author and date
  margin-bottom: 20px; // Space below the meta info
`;

export const UserName = styled.p`
  color: rgba(128, 128, 128, 0.603);
  font-style: italic;
`;

export const BlogTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const BlogContent = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  margin-bottom: 20px;
  padding: 15px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 16px;
`;

export const LikeButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  transition: color 0.2s;

  i {
    color: ${({ liked }) => (liked ? "red" : "#333")};
  }

  &:hover i {
    color: red;
  }
`;

export const DislikeButton = styled(LikeButton)`
  i {
    color: ${({ disliked }) => (disliked ? "gray" : "#333")};
  }

  &:hover i {
    color: gray;
  }
`;

export const LikeCount = styled.p`
  margin: 0;
  font-size: 1.5rem;
  color: #333;
`;
