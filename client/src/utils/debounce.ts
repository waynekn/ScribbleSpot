import { UserSuggestions, Title } from "../api-requests/requests";

export const debouncedGetUserSuggestions = (cb: Function, delay = 500) => {
  let timeout: ReturnType<typeof setTimeout>;

  return (args: string) => {
    clearTimeout(timeout);

    return new Promise((resolve) => {
      timeout = setTimeout(async () => {
        const suggestions: UserSuggestions = await cb(args);
        resolve(suggestions);
      }, delay);
    });
  };
};

export const debouncedGetBlogSuggestions = (cb: Function, delay = 500) => {
  let timeout: ReturnType<typeof setTimeout>;

  return (args: string) => {
    clearTimeout(timeout);

    return new Promise((resolve) => {
      timeout = setTimeout(async () => {
        const suggestedBlogs: Title = await cb(args);
        resolve(suggestedBlogs);
      }, delay);
    });
  };
};
