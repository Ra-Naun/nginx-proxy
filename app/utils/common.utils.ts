export const isEmpty = (obj: any) => {
  return [Object, Array].includes((obj || {}).constructor) && !Object.entries(obj || {}).length;
};

export const isServer = () => typeof window === 'undefined';

export const notForNextAssets = (middleware: any) => (req: any, res: any, next: any) => {
  if (/^\/_next\//.test(req.url) || /\.[a-zA-Z0-9]+$/.test(req.path)) {
    return next();
  }
  return middleware(req, res, next);
};

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getHash = (str: string) => {
  //set variable hash as 0
  let hash = 0;

  // if the length of the string is 0, return 0
  if (str.length === 0) return hash;

  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i);
    hash = (hash << 5) - hash + ch;
    hash = hash & hash;
  }

  return hash;
};
