function validatePostBody(req, res, next) {
  const { title, content, cover } = req.body;
  if (!title || !content)
    throw new Error("title and content are required", { cause: 400 });
  if (!cover || cover.trim() === "") {
    req.body.cover =
      "https://png.pngtree.com/background/20230410/original/pngtree-robot-blue-light-technology-artificial-intelligence-future-robot-picture-image_2380622.jpg";
  }
  next();
}
export default validatePostBody;
