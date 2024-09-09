import axios from "axios";
import { AxiosError } from "axios";
import { AuthError } from "./request-errors/errors";
export const URL = `http://localhost:8000`;

export type User = {
  email: string;
  userName: string;
  profilePicture: string;
  dateJoined: Date;
};

export type ErrorResponse = {
  error: string;
};

type Title = {
  title: string;
  titleSlug: string;
};

type BlogContent = {
  title: string;
  userName: string;
  content: string;
};

export const authenticateUser = (provider: string, action: string) => {
  window.location.href = `${URL}/auth/${provider}/${action}`;
};

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

export const uploadContent = async (title: string, blogContent: string) => {
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
