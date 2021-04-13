const validator = require("validator");

class UserValidator {
  async validate(req, res, next) {
    try {
      let act = req.route.path.substring(1);
      let errors = [];

      if (act === "signup") {
        if (!validator.isAlpha(validator.blacklist(req.body.name, " "))) {
          errors.push("Name must be alphabet");
        }

        if (
          !validator.isStrongPassword(req.body.password, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
            returnScore: false,
            pointsPerUnique: 1,
            pointsPerRepeat: 0.5,
            pointsForContainingLower: 10,
            pointsForContainingUpper: 10,
            pointsForContainingNumber: 10,
            pointsForContainingSymbol: 10,
          })
        ) {
          errors.push("password must have minimum length 8, minimum 1 lowercase character, minimum 1 uppercase character, minimum 1 numbers, and minimum 1 symbols");
        }

        if (req.body.confirmPassword !== req.body.password) {
          errors.push("password tidak sama");
        }
      }

      if (!validator.isEmail(req.body.email)) {
        errors.push("Email tidak valid");
      }

      if (errors.length > 0) {
        return res.status(400).json({
          message: errors.join(", "),
        });
      }
      next();
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        error: e,
      });
    }
  }
}

module.exports = new UserValidator();
