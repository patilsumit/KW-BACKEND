import Message from '../message';
import User from '../datamodels/User';
import { decode } from '../utils/jwt.utils';

export const isSuperAdmin = (req, res, next) => {
  try {
    const token = req.headers.authorization
      ? req.headers.authorization.split(' ')[1]
      : '';
    if (!token) {
      return res
        .status(403)
        .json({ success: false, message: Message.TOKEN_MISSING, status: 403 });
    }

    decode(token)
      .then((payload: any) => {
        User.findOne(
          {
            email: payload.email,
            roleName: 'SuperAdmin',
          },
          '-__v -password'
        ).exec((err, doc) => {
          if (err || !doc) {
            return res.status(403).send({
              success: false,
              message: Message.TOKEN_NOT_ALLOW,
              status: 403,
            });
          }
          req.user = doc;
          return next();
        });
      })
      .catch((err) => {
        return res.status(403).send({
          success: false,
          message: Message.TOKEN_EXPIRE,
          status: 403,
        });
      });
  } catch (error) {
    console.log(error);
    res
      .status(401)
      .json({ sessionValid: false, message: Message.TOKEN_EXPIRE });
  }
};

export const isAdmin = (req, res, next) => {
  try {
    const token = req.headers.authorization
      ? req.headers.authorization.split(' ')[1]
      : '';
    if (!token) {
      return res
        .status(403)
        .json({ success: false, message: Message.TOKEN_MISSING, status: 403 });
    }

    decode(token)
      .then((payload: any) => {
        User.findOne(
          {
            email: payload.email,
            roleName: 'Admin',
          },
          '-__v -password'
        ).exec((err, doc) => {
          if (err || !doc) {
            return res.status(403).send({
              success: false,
              message: Message.TOKEN_NOT_ALLOW,
              status: 403,
            });
          }
          req.user = doc;
          return next();
        });
      })
      .catch((err) => {
        return res.status(403).send({
          success: false,
          message: Message.TOKEN_EXPIRE,
          status: 403,
        });
      });
  } catch (error) {
    console.log(error);
    res
      .status(401)
      .json({ sessionValid: false, message: Message.TOKEN_EXPIRE });
  }
};

export const isValidate = (req, res, next) => {
  try {
    const token = req.headers.authorization
      ? req.headers.authorization.split(' ')[1]
      : '';
    if (!token) {
      return res
        .status(403)
        .json({ success: false, message: Message.TOKEN_MISSING, status: 403 });
    }

    decode(token)
      .then((payload: any) => {
        User.findOne(
          {
            email: payload.email,
            roleName: {$in: ['User','Admin','SuperAdmin']},
          },
          '-__v -password'
        ).exec((err, doc) => {
          if (err || !doc) {
            return res.status(403).send({
              success: false,
              message: Message.TOKEN_NOT_ALLOW,
              status: 403,
            });
          }
          req.user = doc;
          return next();
        });
      })
      .catch((err) => {
        return res.status(403).send({
          success: false,
          message: Message.TOKEN_EXPIRE,
          status: 403,
        });
      });
  } catch (error) {
    console.log(error);
    res
      .status(401)
      .json({ sessionValid: false, message: Message.TOKEN_EXPIRE });
  }
};
