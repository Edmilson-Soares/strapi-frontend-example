'use strict'

/*
axios
.post('http://localhost:1337/auth/forgot-password', {
email: 'user@strapi.io',
url:
'http:/localhost:1337/admin/plugins/users-permissions/auth/reset-password',
})
.then(response => {
// Handle success.
console.log('Your user received an email');
})
.catch(error => {
// Handle error.
console.log('An error occurred:', error.response);
});

*/ 
const crypton = require('../utils/crypton')
const db = require('../utils/user')
const Email = require('../utils/email')

const express = require('express')
const apiRequest = require('../utils/api')

const _ = require('lodash')


let router = express.Router()

// GET /auth/login
router.get('/login', (req, res, next) => {

  res.render('users/login')
})



// POST /auth/local
router.post('/local', async (req, res, next) => {
let user = await db.get('user')
.find({ email: req.body.identifier })
.value()
console.log(user)
if(user.senha1==req.body.password){
  apiRequest
  .post('/auth/local', {form:
  {
    identifier:user.email,
    password:user.senha
  }
  
  }, (err, response, body) => {
    if (err) return next(err)

    req.session.user = _.pick(body.user, ['id', 'username', 'email'])
    req.session.jwt = body.jwt
    console.log(req.session.user,req.session.jwt,response.body)
    res.redirect('/inicio')
  })
}else{
  res.render('users/login')
}

})

// GET /auth/register
router.get('/register', (req, res, next) => {
  res.render('users/register')
})

router.get('/esquece', (req, res, next) => {
  res.render('users/esquece')
})

// POST /auth/esquece  email: 'some@email.com' req.body.email
router.post('/esquece', async (req, res, next) => {
  let user = await db.get('user')
.find({ email: req.body.email })
.value()
//user.email
if(user){
  try {
    Email(user.email).then(res.redirect('/auth/Recuperar')).catch(console.error);
      
      
  } catch (error) {
    es.render('users/esquece')
  }
   
 
}else{
  res.render('users/esquece')
}
  })
// POST /auth/register
router.post('/register', (req, res, next) => {

  let user ={
    email:req.body.email,
    senha:req.body.password,
    senha1:req.body.password
  }



  apiRequest
  .post('/auth/local/register', {form: req.body}, (err, response, body) => {
    if (err) return next(err)
    req.session.user = _.pick(body.user, ['id', 'username', 'email'])
    req.session.jwt = body.jwt
    db.get('user')
    .push(user)
    .write()
    res.redirect('/inicio')
  })
})



// POST /auth/logout
router.post('/user/logout', (req, res, next) => {
  req.session = null
  res.redirect('/')
})
router.get('/logout', (req, res, next) => {
  req.session = null
  res.redirect('/auth/login')
})
/// get recuperar senha
router.get('/Recuperar', (req, res, next) => {
  res.render('users/recuperar')
})

/// get recuperar senha
router.get('/recuperar:id', (req, res, next) => {
  var r = req.params.id.split("+");
  let now=new Date;
  let b =now.toString()
  let c=b.split(" ");
  let c1=c[4].split(":");
  let a={email:crypton.decrypt(r[0]),data:crypton.decrypt(r[1])}
  let s=a.data.split(" ");
  let s1=s[4].split(":");
  console.log(c1,s1,parseInt(s1[0]),parseInt(c1[0]))
  for (let i = 0; i < s.length; i++) {
      
      if(i==4){
        if(parseInt(s1[0])>parseInt(c1[0])){
          req.session.email=a.email;
          res.render('users/recupera')
        }else{
          res.redirect('/auth/esquece')
        }
      }else{
        if(s[i]==c[i]){

        }else{
          res.redirect('/auth/esquece')
        }
      }
  }
  
  
})

// POST /auth/local
router.post('/Recuperar', async (req, res, next) => {
   //
  db.get("user").find({email:req.session.email}).assign({senha1: req.body.password}).write()
  let user = await db.get('user').find({ email: req.session.email}).value()
//  console.log(user)
 apiRequest
    .post('/auth/local', {form:
    {
      identifier:user.email,
      password:user.senha
    }
    
    }, (err, response, body) => {
      if (err) return next(err)
      req.session.email=null
      req.session.user = _.pick(body.user, ['id', 'username', 'email'])
      req.session.jwt = body.jwt
      res.redirect('/inicio')
    })
  
  
  })

module.exports = router
