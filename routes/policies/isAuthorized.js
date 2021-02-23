module.exports = function isAuthorizer (req, res, next) {

  if (req.session.jwt) return next()
  res.redirect('/auth/login')
}
