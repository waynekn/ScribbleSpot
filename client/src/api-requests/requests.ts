import axios from "axios";
import { AxiosError } from "axios";
import { AuthError } from "./request-errors/errors";
export const URL = `http://localhost:8000`;

export type User = {
  email: string;
  displayName: string;
  profilePicture: string;
  dateJoined: Date;
};

type UserProfileResponse = {
  profile: User;
};

export type ErrorResponse = {
  error: string;
};

type Blogs = {
  displayName: string;
  title: string;
  content: string;
};

export const authenticateUser = (provider: string, action: string) => {
  window.location.href = `${URL}/auth/${provider}/${action}`;
};

export const getUserProfile = async (): Promise<UserProfileResponse> => {
  try {
    const response = await axios.get<UserProfileResponse>(
      `${URL}/users/profile`
    );
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

export const getImageUrl = async (imageKey: string) => {
  try {
    const res = await axios.post<{ imageUrl: string }>(
      `${URL}/users/profile/profile-picture`,
      {
        imageKey,
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

export const uploadContent = async (title: string, htmlContent: string) => {
  try {
    const response = await axios.post<{ message: string }>(`${URL}/post/blog`, {
      title,
      htmlContent,
    });
    return response.data;
  } catch (error) {
    console.warn(error);
    if (error instanceof AxiosError) {
      const axiosError = error as AxiosError<ErrorResponse>;
      const errorMessage = axiosError.response?.data.error;
      throw new Error(errorMessage);
    }
    throw new Error("Unknown error occured");
  }
};

export const fetchBlogs = async () => {
  try {
    const res = await axios.get<{ blogs: Blogs[] }>(`${URL}/post/my-blogs`);
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const axiosError = error as AxiosError<ErrorResponse>;
      const errorMessage = axiosError.response?.data.error;
      throw new Error(error.message);
    }
    throw new Error("An unkown error occured");
  }
};
