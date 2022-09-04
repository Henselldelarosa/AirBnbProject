router.post(['/', '/login'], validateLogin, async (req, res, next) => {
  // deconstruct credential and password from request body
  const { email, password } = req.body;

  // log the given user in
  let user = await User.login({ email, password });

  // if user does not exist, pass on to next errorware
  if (!user) {
    const err = new Error('Invalid credentials');
    err.status = 401;
    return next(err);
  }

  // TODO: Add token
  // const token = res.cookies.token || "";
  const token = setTokenCookie(res, user);

  // return current user info
  const loginUserInfo = await User.scope('currentUser').findByPk(user.id)
  loginUserInfo.dataValues['token'] = token;

  // TODO: Successful Response
  return res.json(
    loginUserInfo
  );
});
