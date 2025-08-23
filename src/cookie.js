const setCookie = (res, token) => {
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,          
    sameSite: "none",     
    maxAge: 1000 * 60 * 60 * 24
  });
};

module.exports = setCookie;