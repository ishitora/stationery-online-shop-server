const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const newToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.SECRET, {
    expiresIn: '1 day',
  });
};

const verifyToken = (token) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, process.env.SECRET, (err, payload) => {
      if (err) return reject(err);
      resolve(payload);
    });
  });

const signUp = async (req, res) => {
  try {
    const doc = await User.create({
      ...req.body,
    });
    console.log('註冊成功', doc);
    //註冊成功
    return res.status(201).send({ message: '註冊成功' });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

const checkEmail = async (req, res) => {
  //檢驗是否重複的信箱

  try {
    const user = await User.findOne({ email: req.body.email })
      .select('-_id  -__v -createdAt -updatedAt')
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

const signIn = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({ message: 'need email and password' });
  }

  const invalid = { message: 'email或密碼錯誤' };

  try {
    const user = await User.findOne({ email: req.body.email }).exec();

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
    return res.status(201).send({ profile: newUser, token });
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

const protect = async (req, res, next) => {
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

  const user = await User.findById(payload.id)
    .select('-password')
    .lean()
    .exec();

  if (!user) {
    return res.status(401).end();
  }

  req.user = user;
  next();
};

module.exports = { signUp, signIn, getUserByToken, checkEmail, protect };
