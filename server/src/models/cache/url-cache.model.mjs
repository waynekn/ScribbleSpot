import caches from "../../schemas/cache/url-cache.schema.mjs";

export const getCache = (id) => caches.findOne({ userId: id });

export const updateCache = (newCache) => {
  return caches.findOneAndUpdate({ userId: newCache.userId }, newCache, {
    upsert: true,
  });
};
