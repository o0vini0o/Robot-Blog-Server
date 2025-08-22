function coverMiddleware(req, res, next) {
  if (!req.body.cover || req.body.cover.trim() === "") {
    req.body.cover =
      "https://png.pngtree.com/background/20230410/original/pngtree-robot-blue-light-technology-artificial-intelligence-future-robot-picture-image_2380622.jpg";
  }
  next();
}
export default coverMiddleware;
