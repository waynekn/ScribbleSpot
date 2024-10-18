import axios from "axios";
import { AxiosError } from "axios";
import { AuthError } from "./request-errors/errors";
import { AuthCredentials } from "../store/user/user.slice";
import {
  debouncedGetUserSuggestions,
  debouncedGetBlogSuggestions,
} from "../utils/debounce";
export const URL = `http://localhost:8000`;

export type LikedBlog = {
  title: string;
  titleSlug: string;
  blogId: string;
};

export type User = {
  email: string;
  userName: string;
  profilePicture: string;
  dateJoined: string;
  likedBlogs: LikedBlog[];
};

//Error responses from the server are standardized and guaranteed
//to be an object with an error key and its value will be a string
export type ErrorResponse = {
  error: string;
};

export type Title = {
  title: string;
  titleSlug: string;
  id: string;
};

export type BlogContent = {
  title: string;
  userName: string;
  content: string;
  datePosted: string;
  _id: string;
  likeCount: number;
  userHasLikedBlog: boolean;
  userHasDislikedBlog: boolean;
};

export type BlogReaction = {
  blogId: string;
  reaction: "like" | "dislike";
};

export type BlogReactionResponse = {
  userHasLikedBlog: boolean;
  userHasDislikedBlog: boolean;
  likeCount: number;
};

export type UserSuggestions = { suggestedUsers: string[] };

type AuthAction = "signin" | "signup";

export const authenticateGoogleUser = (action: AuthAction) => {
  window.location.href = `${URL}/auth/google/${action}`;
};

/**
 * Used for local auth. Local meaning its using a username or emai and not using
 * an oauth provider
 */
export const sendLocalAuthRequest = async (user: AuthCredentials) => {
  const { action, ...userWithoutAction } = user;
  try {
    const res = await axios.post<{ profile: User }>(
      `${URL}/auth/local/${action}`,
      {
        user: userWithoutAction,
      }
    );
    return res.data.profile;
  } catch (error) {
    if (error instanceof AxiosError) {
      const axiosError = error as AxiosError<ErrorResponse>;
      const errorMessage = axiosError.response?.data.error;
      throw new Error(errorMessage);
    }
    throw new Error("Unknown error occured");
  }
};

/**
 * After successful authentication, a thunk is dispatched that calls this function
 * to retrieve the user profile. Immediately after authentication,
 * the client does not have a username available for POST requests. Instead, the
 * username is derived from a cookie issued during authentication
 */
export const getUserProfile = async (userName?: string) => {
  try {
    if (userName) {
      const res = await axios.post<{ profile: User }>(`${URL}/users/profile`, {
        userName,
      });
      return res.data.profile;
    }
    const res = await axios.get<{ profile: User }>(`${URL}/users/profile`);
    return res.data.profile;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ErrorResponse>;
      const statusCode = axiosError.response?.status;
      const errorMessage =
        axiosError.response?.data?.error || "An unknown error occurred";
      if (statusCode === 401 || statusCode === 403) {
        throw new AuthError();
      }
      throw new Error(errorMessage);
    } else {
      throw new Error("An unknow error occurred");
    }
  }
};

export const signOutUser = () => {
  return axios.post(`${URL}/auth/logout`);
};

export const checkAuthStatus = async () => {
  try {
    await axios.get(`${URL}/auth-status`);
  } catch (error) {
    if (error instanceof AxiosError) {
      const axiosError = error as AxiosError<ErrorResponse>;
      const statusCode = axiosError.response?.status;

      if (statusCode === 401 || statusCode === 403) {
        throw new AuthError();
      }
    }

    throw new Error("Unknown error occured. Please try again");
  }
};

export const getImageUrl = async (imageKey: string, userName: string) => {
  try {
    const res = await axios.post<{ imageUrl: string }>(
      `${URL}/users/profile/profile-picture`,
      {
        imageKey,
        userName,
      }
    );
    return res.data.imageUrl;
  } catch (error) {
    if (error instanceof AxiosError) {
      const axiosError = error as AxiosError<ErrorResponse>;
      const errorMessage = axiosError.response?.data.error;
      throw new Error(errorMessage);
    }
    throw new Error("Unknown error occured");
  }
};

export const uploadSettingsForm = (formData: FormDataEntryValue) => {
  return axios.post(`${URL}/users/profile`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const uploadBlog = async (title: string, blogContent: string) => {
  try {
    const res = await axios.post<{ message: string }>(`${URL}/posts/blog`, {
      title,
      blogContent,
    });
    return res.data.message;
  } catch (error) {
    if (error instanceof AxiosError) {
      const axiosError = error as AxiosError<ErrorResponse>;
      const errorMessage =
        axiosError.response?.data?.error || "An unknown error occurred";
      throw new Error(errorMessage);
    }
    throw new Error("Unknown error occured");
  }
};

export const fetchTitles = async (userName: string) => {
  try {
    const res = await axios.post<{ titles: Title[] }>(`${URL}/posts/titles`, {
      userName,
    });
    return res.data;
  } catch (error) {
    throw new Error("An error occured when getting titles");
  }
};

export const fetchBlogContent = async (blogId: string) => {
  try {
    const res = await axios.post<{ blog: BlogContent }>(
      `${URL}/posts/content`,
      { blogId }
    );
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const axiosError = error as AxiosError<ErrorResponse>;
      const errorMessage =
        axiosError.response?.data.error || "Unknown error occurred";
      throw new Error(errorMessage);
    }
    throw new Error("An unkown error occured");
  }
};

export const deleteBlogRequest = async (title: string) => {
  try {
    const res = await axios.post<{ message: string }>(
      `${URL}/posts/blog/delete`,
      { title }
    );
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const axiosError = error as AxiosError<ErrorResponse>;
      const errorMessage =
        axiosError.response?.data.error || "An unknown error occured";
      throw new Error(errorMessage);
    }
    throw new Error("An unknown error occurred");
  }
};

export const submitBlogReaction = async (blogReaction: BlogReaction) => {
  try {
    const res = await axios.post<{ blogReactionResult: BlogReactionResponse }>(
      `${URL}/posts/blog/react`,
      {
        blogReaction,
      }
    );
    return res.data.blogReactionResult;
  } catch (error) {
    if (error instanceof AxiosError) {
      const axiosError = error as AxiosError<ErrorResponse>;
      const errorMessage =
        axiosError.response?.data.error || "An unknown error occured";
      throw new Error(errorMessage);
    }
    throw new Error("An unknown error occurred");
  }
};

export const getUserSuggestions = debouncedGetUserSuggestions(
  async (userName: string) => {
    try {
      const res = await axios.post<UserSuggestions>(`${URL}/users`, {
        userName,
      });
      return res.data.suggestedUsers;
    } catch (error) {
      if (error instanceof AxiosError) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const statusCode = axiosError.response?.status;

        if (statusCode === 401 || statusCode === 403) throw new AuthError();

        const errorMessage =
          axiosError.response?.data.error || "An unknown error occurred";
        throw new Error(errorMessage);
      }
      throw new Error("An unknown error occurred");
    }
  }
);

export const getBlogSuggestions = debouncedGetBlogSuggestions(
  async (title: String) => {
    try {
      const res = await axios.post<{ suggestedBlogs: Title[] }>(
        `${URL}/posts`,
        {
          title,
        }
      );
      return res.data.suggestedBlogs;
    } catch (error) {
      if (error instanceof AxiosError) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const statusCode = axiosError.response?.status;

        if (statusCode === 401 || statusCode === 403) throw new AuthError();

        const errorMessage =
          axiosError.response?.data.error || "An unknown error occurred";
        throw new Error(errorMessage);
      }
      throw new Error("An unknown error occurred");
    }
  }
);
