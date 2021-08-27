const User = require('../models/userModel');
const { newToken, verifyToken } = require('../utils/auth');

const signUp = async (req, res) => {
  try {
    const user = await User.create({
      ...req.body,
    });

    //註冊成功
    const token = newToken(user);
    const newUser = { ...user._doc };
    console.log('user=', user);
    delete newUser.password;
    delete newUser._id;
    delete newUser.__v;
    delete newUser.viewHistory;
    return res.status(201).send({ ...newUser, token });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

const signIn = async (req, res) => {
  console.log('req=', req);
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({ message: 'need email and password' });
  }

  const invalid = { message: 'email或密碼錯誤' };

  try {
    const user = await User.findOne({ email: req.body.email })
      .select('-_id  -__v -viewHistory')
      .exec();

    if (!user) {
      return res.status(401).send(invalid);
    }

    const match = await user.checkPassword(req.body.password);

    if (!match) {
      return res.status(401).send(invalid);
    }

    const token = newToken(user);
    const newUser = { ...user._doc };
    delete newUser.password;
    return res.status(201).send({ ...newUser, token });
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
};

const getUserByToken = async (req, res) => {
  console.log('頭', req.headers.authorization);
  const bearer = req.headers.authorization;

  if (!bearer || !bearer.startsWith('Bearer ')) {
    return res.status(401).end();
  }

  const token = bearer.split('Bearer ')[1].trim();
  let payload;
  try {
    payload = await verifyToken(token);
  } catch (e) {
    return res.status(401).end();
  }
  console.log(payload);
  const user = await User.findById(payload.id).select(' -password -__v').lean();

  if (!user) {
    return res.status(401).end();
  }

  return res.status(201).send(user);
};

const checkEmail = async (req, res) => {
  //檢驗是否重複的信箱
  try {
    const user = await User.findOne({ email: req.body.email })
      .select('-_id  -__v')
      .exec();

    if (user) {
      return res.status(201).send(false);
    }

    return res.status(201).send(true);
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
};

module.exports = { signUp, signIn, getUserByToken, checkEmail };
