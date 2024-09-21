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
  margin-bottom: 16px; // Added margin to separate from buttons
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start; // Align buttons to the left
  gap: 8px; // Space between buttons
`;

export const LikeButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;

  i {
    color: ${({ liked }) => (liked ? "red" : "inherit")};
  }

  &:hover i {
    color: red;
  }
`;

export const DislikeButton = styled(LikeButton)`
  // Gray when disliked
  i {
    color: ${({ disliked }) => (disliked ? "gray" : "inherit")};
  }

  &:hover i {
    color: gray;
  }
`;

export const LikeCount = styled.p`
  margin: 0;
  font-size: 1.5rem;
`;
