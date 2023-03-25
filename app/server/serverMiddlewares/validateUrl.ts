export const validateUrl = (req: any, res: any, next: any) => {
  try {
    decodeURIComponent(req.path);
  } catch (e) {
    return res.redirect('/404');
  }
  next();
};
