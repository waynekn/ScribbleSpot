import axios from "axios";
import { AxiosError } from "axios";
import { AuthError } from "./request-errors/errors";
import { AuthCredentials } from "../store/user/user.slice";
export const URL = `http://localhost:8000`;

export type User = {
  email: string;
  userName: string;
  profilePicture: string;
  dateJoined: string;
};

//Error responses from the server are standardized and guaranteed
//to be an object with an error key and its value will be a string
export type ErrorResponse = {
  error: string;
};

type Title = {
  title: string;
  titleSlug: string;
};

export type BlogContent = {
  title: string;
  userName: string;
  content: string;
  datePosted: string;
};

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
    return res.data;
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
      const response = await axios.post<{ profile: User }>(
        `${URL}/users/profile`,
        { userName }
      );
      return response.data;
    }
    const response = await axios.get<{ profile: User }>(`${URL}/users/profile`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ErrorResponse>;
      const statusCode = axiosError.response?.status;
      const errorMessage =
        axiosError.response?.data?.error || axiosError.message;

      if (statusCode === 404 || statusCode === 500) {
        throw new Error(`${errorMessage}`);
      } else {
        throw new Error(`An error occurred: ${errorMessage}`);
      }
    } else {
      throw new Error("An unexpected error occurred");
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
    return res.data;
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
    const response = await axios.post<{ message: string }>(
      `${URL}/posts/blog`,
      {
        title,
        blogContent,
      }
    );
    return response.data;
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

export const fetchBlogContent = async (titleSlug: string, userName: string) => {
  try {
    const res = await axios.post<{ blog: BlogContent }>(
      `${URL}/posts/content`,
      { titleSlug, userName }
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
