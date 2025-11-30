import jsonwebtoken from "jsonwebtoken";
export const jwtMiddleware = (req, res, next) => {

    let { authorization } = req.headers;
    if (!authorization) {
      return next("Api yêu cầu quyền truy cập");
    }
    try {
        let check = jsonwebtoken.verify(
            authorization.replace("Bearer ", ""),
            "secret-key"
          );
          if (check) {
            req.user = check.id;
            return next();
          }
    } catch (error) {
        next(error);
    }

};