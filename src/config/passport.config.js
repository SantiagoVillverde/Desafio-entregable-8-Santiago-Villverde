
import passport from "passport";
import local from "passport-local";
import userManager from "../dao/dbmanagers/user.manager.js";
import { encryptPassword, comparePassword } from "../utils/encrypt.util.js";

const LocalStrategy = local.Strategy;
const initializePassport = () => {
  passport.use(
    "register",
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, username, password, done) => {
        const { first_name, last_name, email, age, img } = req.body;
        try {
          let user = await userManager.getByEmail(username);
          if (user) {
            console.log("El usuario ya existe");
            return done(null, false);
          }

          const encryptedPass = await encryptPassword(password);
          const newUser = await userManager.createUser({
            first_name,
            last_name,
            email,
            age,
            password: encryptedPass,
            img,
          });

          return done(null, newUser);
        } catch (err) {
          return done("Error al generar el usuario: " + err);
        }
      }
    )
  );

  passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "email" },
      async (username, password, done) => {
        try {
          const user = await userManager.getByEmail(username);
          if (!user) {
            console.log("El usuario no existe. Regístrese");
            return done(null, false);
          }
          if (!comparePassword(user, password)) {
            console.log("La contraseña no es correcta. Intente nuevamente");
            return done(null, false);
          }
          return done(null, user);
        } catch (err) {
          return done("Error de servidor para el login: " + err);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    let user = await userManager.getById(id);
    if (
      user.email === "adminCoder@coder.com" &&
      user.password === "adminCod3r123"
    ) {
      user.role = "Admin";
    } else {
      user.role = "User";
    }
    done(null, user);
  });
};

export default initializePassport;
