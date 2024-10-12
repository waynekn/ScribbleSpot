import cache from "../../schemas/url-cache.schema.js";

export const getCache = (userName) => cache.findOne({ userName: userName });

export const updateCache = (newCache) => {
  return cache.findOneAndUpdate({ userName: newCache.userName }, newCache, {
    upsert: true,
  });
};
