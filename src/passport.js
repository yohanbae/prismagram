import passport from "passport";
import {Strategy, ExtractJwt} from "passport-jwt";

import {prisma} from "../generated/prisma-client";

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
};

const verifyUser = async (payload, done) => {
    try {
        const user = await prisma.user({id: payload.id});
        if(user !== null){
            return done(null, user);
        }else{
            return done(null, false);
        }
    }catch(error){
        console.log(error);
        return done(error, false);
    }
};
//with the token id, we get full user information via verifyUser and return it.
// that's how server get user information w the token.

export const authenticateJwt = (req, res, next) =>
  passport.authenticate("jwt", { sessions: false }, (error, user) => {
    if (user) {
      req.user = user;
      console.log(req.user);
    }else{
        // console.log(error);
    }
    next();
  })(req, res, next);


//이거 좀 이상한데, 그냥 해. next()에서 리턴되는게 함수고, 그 함수가 req res next인자로 실행되는거다.

passport.use(new Strategy(jwtOptions, verifyUser));
passport.initialize();