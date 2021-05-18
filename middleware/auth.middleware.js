const jwt = require("jsonwebtoken");
const result = require("../helper/result.helps");

const VerifyToken = (handler) => async (req, res) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    result.BadRequest(res, "Không tìm thấy Token");
    return;
  }

  jwt.verify(token, process.env.AUTH_SECRET_KEY, (err, decoded) => {
    if (err) {
      result.Unauthorized(res, "Không có quyền truy cập (kiểm tra lại token)");
      return;
    }

    req.user_id = decoded.id;
    handler(req, res);
  });
};

export default VerifyToken;
