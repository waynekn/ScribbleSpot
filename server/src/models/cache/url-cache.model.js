import caches from "../../schemas/cache/url-cache.schema.js";

export const getCache = (userName) => caches.findOne({ userName: userName });

export const updateCache = (newCache) => {
  return caches.findOneAndUpdate({ userName: newCache.userName }, newCache, {
    upsert: true,
  });
};
