export const sanitizeInput = (req, res, next) => {
    const sanitize = (obj) =>
      Object.fromEntries(
        Object.entries(obj).map(([key, val]) => [key, typeof val === "string" ? xss(val) : val])
      );
  
    if (req.body) req.body = sanitize(req.body);
    if (req.query) req.query = sanitize(req.query);
    if (req.params) req.params = sanitize(req.params);
  
    next();
  };