'use strict'

const express = require('express')
const apiRequest = require('../utils/api')

const isAuthorized = require('./policies/isAuthorized')

let router = express.Router()

router.use((req, res, next) => {
  res.locals.currentUser = req.session.user
  res.locals.jwt = req.session.jwt
  next()
})

router.use('/users', require('./users'))
router.use('/articles', require('./articles'))
router.use('/auth', require('./auth'))
router.use('/platforms', require('./platforms'))
router.use('/encomenda', require('./encomenda'))

// GET /
router.get('/inicio', isAuthorized,(req, res, next) => {
 /* apiRequest({
    uri: `/article`,
    qs: {
      sort: 'createdAt DESC'
    }
  }, (err, response, body) => {
    if (err) return next(err)
    res.render('/')
  })*/
 // console.log(req.session.user)

  res.render('loja/index', { 
    title: 'Express' ,
    loja:{
      distaques:[
        {
          nome:"Nome",
          desc:"Nosso",
          link:"#",
          img1:"images/logo.jpeg",
          img2:"images/home/pricing.png"
        },
        {
          nome:"Nome",
          desc:"Nosso",
          link:"#",
          img1:"images/logo.jpeg",
          img2:"images/home/pricing.png"
        }
      ],

      encomendados:[
        {
          nome:"Nome",
          desc:"Nosso",
          link:"#",
          img1:"images/logo.jpeg",
          img2:"images/home/pricing.png"
        },
        {
          nome:"Nome",
          desc:"Nosso",
          link:"#",
          img1:"images/logo.jpeg",
          img2:"images/home/pricing.png"
        },        {
          nome:"Nome",
          desc:"Nosso",
          link:"#",
          img1:"images/logo.jpeg",
          img2:"images/home/pricing.png"
        }

      ],
      categorias:[
        {
          nome:"Nome",
          colecoes:[
            {
              nome:"Nome",
              produto:[
                {
                  nome:"Nome",
                  preco:45,
                  id:2,
                  img:"images/logo.jpeg"

               },
               {
                nome:"Nome",
                preco:45,
                id:2,
                img:"images/logo.jpeg"

             }
             ]
          },
            {
              nome:"Nome",
              produto:[
                {
                  nome:"Nome",
                  preco:45,
                  id:2,
                  img:""

               }
             ]
          }
          ]
          

        },
        {
          nome:"Nome",
          colecoes:[
            {
              nome:"Nome",
              produto:[
                {
                  nome:"Nome",
                  preco:45,
                  id:2,
                  img:""

               }
             ]
          },
            {
              nome:"Nome",
              produto:[
                {
                  nome:"Nome",
                  preco:45,
                  id:2,
                  img:""

               }
             ]
          }
          ]
     
        }
      ]
    },
    user:{
       nomeUsuario:req.session.user.username,
       encomenda:{

       },
       compra:{

      }

    },
    user2:JSON.stringify({
      nomeUsuario:"edmilson",
      encomenda:{

      },
      compra:{

     }

   })

  });
})


  router.get('/andamento', isAuthorized,(req, res, next) => {
     res.render('loja/andamento_service', { 
       title: 'Express' ,
       loja:{
         distaques:[
           {
             nome:"Nome",
             desc:"Nosso",
             link:"#",
             img1:"images/logo.jpeg",
             img2:"images/home/pricing.png"
           },
           {
             nome:"Nome",
             desc:"Nosso",
             link:"#",
             img1:"images/logo.jpeg",
             img2:"images/home/pricing.png"
           }
         ],
   
         encomendados:[
           {
             nome:"Nome",
             desc:"Nosso",
             link:"#",
             img1:"images/logo.jpeg",
             img2:"images/home/pricing.png"
           },
           {
             nome:"Nome",
             desc:"Nosso",
             link:"#",
             img1:"images/logo.jpeg",
             img2:"images/home/pricing.png"
           },        {
             nome:"Nome",
             desc:"Nosso",
             link:"#",
             img1:"images/logo.jpeg",
             img2:"images/home/pricing.png"
           }
   
         ],
         categorias:[
           {
             nome:"Nome",
             colecoes:[
               {
                 nome:"Nome",
                 produto:[
                   {
                     nome:"Nome",
                     preco:45,
                     id:2,
                     img:"images/logo.jpeg"
   
                  },
                  {
                   nome:"Nome",
                   preco:45,
                   id:2,
                   img:"images/logo.jpeg"
   
                }
                ]
             },
               {
                 nome:"Nome",
                 produto:[
                   {
                     nome:"Nome",
                     preco:45,
                     id:2,
                     img:""
   
                  }
                ]
             }
             ]
             
   
           },
           {
             nome:"Nome",
             colecoes:[
               {
                 nome:"Nome",
                 produto:[
                   {
                     nome:"Nome",
                     preco:45,
                     id:2,
                     img:""
   
                  }
                ]
             },
               {
                 nome:"Nome",
                 produto:[
                   {
                     nome:"Nome",
                     preco:45,
                     id:2,
                     img:""
   
                  }
                ]
             }
             ]
        
           }
         ]
       },
       user:{
        username:req.session.user.username,
          encomenda:{
   
          },
          compra:{
   
         }
   
       },
         compra:{
   
        }
   
      })
   })

router.post('/solicitar', isAuthorized,(req, res, next) => {
    console.log(req.session.user,req.body)
    apiRequest
    .post('/solicitacoes', {form:{
      Tipo:req.body.tipo,
      confirmado:false,
      user:req.session.user.id
    
    },
    headers: {
      'Authorization': `Bearer ${req.session.jwt}`
    }}, 
    (err, response, body) => {
      if (err) return next(err)
      res.send(response)
      ///users?firstName=John
     /* apiRequest
      .get(`/solicitacoes/count?user=${req.session.user.id}`, {
      headers: {
        'Authorization': `Bearer ${req.session.jwt}`
      }}, 
      (err, response1, body1) => {
        if (err) return next(err)
         //console.log(body)
         res.send({body}) 
      })*/
    })
})

router.get('/solicitarUser', isAuthorized,(req, res, next) => {
  console.log(req.session.user,req.body)
    apiRequest
    .get(`/solicitacoes/count?user=${req.session.user.id}`, {
    headers: {
      'Authorization': `Bearer ${req.session.jwt}`
    }}, 
    (err, response, body) => {
      if (err) return next(err)
       //console.log(body)
       res.send(response)
    })

})

   router.get('/encomendas', isAuthorized,(req, res, next) => {
    res.render('loja/encomenda', { 
      title: 'Express' ,
      loja:{
        distaques:[
          {
            nome:"Nome",
            desc:"Nosso",
            link:"#",
            img1:"images/logo.jpeg",
            img2:"images/home/pricing.png"
          },
          {
            nome:"Nome",
            desc:"Nosso",
            link:"#",
            img1:"images/logo.jpeg",
            img2:"images/home/pricing.png"
          }
        ],
  
        encomendados:[
          {
            nome:"Nome",
            desc:"Nosso",
            link:"#",
            img1:"images/logo.jpeg",
            img2:"images/home/pricing.png"
          },
          {
            nome:"Nome",
            desc:"Nosso",
            link:"#",
            img1:"images/logo.jpeg",
            img2:"images/home/pricing.png"
          },        {
            nome:"Nome",
            desc:"Nosso",
            link:"#",
            img1:"images/logo.jpeg",
            img2:"images/home/pricing.png"
          }
  
        ],
        categorias:[
          {
            nome:"Nome",
            colecoes:[
              {
                nome:"Nome",
                produto:[
                  {
                    nome:"Nome",
                    preco:45,
                    id:2,
                    img:"images/logo.jpeg"
  
                 },
                 {
                  nome:"Nome",
                  preco:45,
                  id:2,
                  img:"images/logo.jpeg"
  
               }
               ]
            },
              {
                nome:"Nome",
                produto:[
                  {
                    nome:"Nome",
                    preco:45,
                    id:2,
                    img:""
  
                 }
               ]
            }
            ]
            
  
          },
          {
            nome:"Nome",
            colecoes:[
              {
                nome:"Nome",
                produto:[
                  {
                    nome:"Nome",
                    preco:45,
                    id:2,
                    img:""
  
                 }
               ]
            },
              {
                nome:"Nome",
                produto:[
                  {
                    nome:"Nome",
                    preco:45,
                    id:2,
                    img:""
  
                 }
               ]
            }
            ]
       
          }
        ]
      },
      user:{
       username:req.session.user.username,
         encomenda:{
  
         },
         compra:{
  
        }
  
      },
        compra:{
  
       }
  
     })
  })

  router.get('/produtos', isAuthorized,(req, res, next) => {
    res.render('loja/produtos', { 
      title: 'Express' ,
      loja:{
        distaques:[
          {
            nome:"Nome",
            desc:"Nosso",
            link:"#",
            img1:"images/logo.jpeg",
            img2:"images/home/pricing.png"
          },
          {
            nome:"Nome",
            desc:"Nosso",
            link:"#",
            img1:"images/logo.jpeg",
            img2:"images/home/pricing.png"
          }
        ],
  
        encomendados:[
          {
            nome:"Nome",
            desc:"Nosso",
            link:"#",
            img1:"images/logo.jpeg",
            img2:"images/home/pricing.png"
          },
          {
            nome:"Nome",
            desc:"Nosso",
            link:"#",
            img1:"images/logo.jpeg",
            img2:"images/home/pricing.png"
          },        {
            nome:"Nome",
            desc:"Nosso",
            link:"#",
            img1:"images/logo.jpeg",
            img2:"images/home/pricing.png"
          }
  
        ],
        categorias:[
          {
            nome:"Nome",
            colecoes:[
              {
                nome:"Nome",
                produto:[
                  {
                    nome:"Nome",
                    preco:45,
                    id:2,
                    img:"images/logo.jpeg"
  
                 },
                 {
                  nome:"Nome",
                  preco:45,
                  id:2,
                  img:"images/logo.jpeg"
  
               }
               ]
            },
              {
                nome:"Nome",
                produto:[
                  {
                    nome:"Nome",
                    preco:45,
                    id:2,
                    img:""
  
                 }
               ]
            }
            ]
            
  
          },
          {
            nome:"Nome",
            colecoes:[
              {
                nome:"Nome",
                produto:[
                  {
                    nome:"Nome",
                    preco:45,
                    id:2,
                    img:""
  
                 }
               ]
            },
              {
                nome:"Nome",
                produto:[
                  {
                    nome:"Nome",
                    preco:45,
                    id:2,
                    img:""
  
                 }
               ]
            }
            ]
       
          }
        ]
      },
      user:{
       username:req.session.user.username,
         encomenda:{
  
         },
         compra:{
  
        }
  
      },
        compra:{
  
       }
  
     })
  })

  router.get('/carinho', isAuthorized,(req, res, next) => {
    res.render('loja/carinho', { 
      title: 'Express' ,
      loja:{
        distaques:[
          {
            nome:"Nome",
            desc:"Nosso",
            link:"#",
            img1:"images/logo.jpeg",
            img2:"images/home/pricing.png"
          },
          {
            nome:"Nome",
            desc:"Nosso",
            link:"#",
            img1:"images/logo.jpeg",
            img2:"images/home/pricing.png"
          }
        ],
  
        encomendados:[
          {
            nome:"Nome",
            desc:"Nosso",
            link:"#",
            img1:"images/logo.jpeg",
            img2:"images/home/pricing.png"
          },
          {
            nome:"Nome",
            desc:"Nosso",
            link:"#",
            img1:"images/logo.jpeg",
            img2:"images/home/pricing.png"
          },        {
            nome:"Nome",
            desc:"Nosso",
            link:"#",
            img1:"images/logo.jpeg",
            img2:"images/home/pricing.png"
          }
  
        ],
        categorias:[
          {
            nome:"Nome",
            colecoes:[
              {
                nome:"Nome",
                produto:[
                  {
                    nome:"Nome",
                    preco:45,
                    id:2,
                    img:"images/logo.jpeg"
  
                 },
                 {
                  nome:"Nome",
                  preco:45,
                  id:2,
                  img:"images/logo.jpeg"
  
               }
               ]
            },
              {
                nome:"Nome",
                produto:[
                  {
                    nome:"Nome",
                    preco:45,
                    id:2,
                    img:""
  
                 }
               ]
            }
            ]
            
  
          },
          {
            nome:"Nome",
            colecoes:[
              {
                nome:"Nome",
                produto:[
                  {
                    nome:"Nome",
                    preco:45,
                    id:2,
                    img:""
  
                 }
               ]
            },
              {
                nome:"Nome",
                produto:[
                  {
                    nome:"Nome",
                    preco:45,
                    id:2,
                    img:""
  
                 }
               ]
            }
            ]
       
          }
        ]
      },
      user:{
       username:req.session.user.username,
         encomenda:{
  
         },
         compra:{
  
        }
  
      },
        compra:{
  
       }
  
     })
  })

  router.get('/notificacao', isAuthorized,(req, res, next) => {
    res.render('loja/notificacao', { 
      title: 'Express' ,
      loja:{
        distaques:[
          {
            nome:"Nome",
            desc:"Nosso",
            link:"#",
            img1:"images/logo.jpeg",
            img2:"images/home/pricing.png"
          },
          {
            nome:"Nome",
            desc:"Nosso",
            link:"#",
            img1:"images/logo.jpeg",
            img2:"images/home/pricing.png"
          }
        ],
  
        encomendados:[
          {
            nome:"Nome",
            desc:"Nosso",
            link:"#",
            img1:"images/logo.jpeg",
            img2:"images/home/pricing.png"
          },
          {
            nome:"Nome",
            desc:"Nosso",
            link:"#",
            img1:"images/logo.jpeg",
            img2:"images/home/pricing.png"
          },        {
            nome:"Nome",
            desc:"Nosso",
            link:"#",
            img1:"images/logo.jpeg",
            img2:"images/home/pricing.png"
          }
  
        ],
        categorias:[
          {
            nome:"Nome",
            colecoes:[
              {
                nome:"Nome",
                produto:[
                  {
                    nome:"Nome",
                    preco:45,
                    id:2,
                    img:"images/logo.jpeg"
  
                 },
                 {
                  nome:"Nome",
                  preco:45,
                  id:2,
                  img:"images/logo.jpeg"
  
               }
               ]
            },
              {
                nome:"Nome",
                produto:[
                  {
                    nome:"Nome",
                    preco:45,
                    id:2,
                    img:""
  
                 }
               ]
            }
            ]
            
  
          },
          {
            nome:"Nome",
            colecoes:[
              {
                nome:"Nome",
                produto:[
                  {
                    nome:"Nome",
                    preco:45,
                    id:2,
                    img:""
  
                 }
               ]
            },
              {
                nome:"Nome",
                produto:[
                  {
                    nome:"Nome",
                    preco:45,
                    id:2,
                    img:""
  
                 }
               ]
            }
            ]
       
          }
        ]
      },
      user:{
       username:req.session.user.username,
         encomenda:{
  
         },
         compra:{
  
        }
  
      },
        compra:{
  
       }
  
     })
  })

  router.get('/perfil', isAuthorized,(req, res, next) => {
    res.render('loja/perfil', { 
      title: 'Express' ,
      loja:{
        distaques:[
          {
            nome:"Nome",
            desc:"Nosso",
            link:"#",
            img1:"images/logo.jpeg",
            img2:"images/home/pricing.png"
          },
          {
            nome:"Nome",
            desc:"Nosso",
            link:"#",
            img1:"images/logo.jpeg",
            img2:"images/home/pricing.png"
          }
        ],
  
        encomendados:[
          {
            nome:"Nome",
            desc:"Nosso",
            link:"#",
            img1:"images/logo.jpeg",
            img2:"images/home/pricing.png"
          },
          {
            nome:"Nome",
            desc:"Nosso",
            link:"#",
            img1:"images/logo.jpeg",
            img2:"images/home/pricing.png"
          },        {
            nome:"Nome",
            desc:"Nosso",
            link:"#",
            img1:"images/logo.jpeg",
            img2:"images/home/pricing.png"
          }
  
        ],
        categorias:[
          {
            nome:"Nome",
            colecoes:[
              {
                nome:"Nome",
                produto:[
                  {
                    nome:"Nome",
                    preco:45,
                    id:2,
                    img:"images/logo.jpeg"
  
                 },
                 {
                  nome:"Nome",
                  preco:45,
                  id:2,
                  img:"images/logo.jpeg"
  
               }
               ]
            },
              {
                nome:"Nome",
                produto:[
                  {
                    nome:"Nome",
                    preco:45,
                    id:2,
                    img:""
  
                 }
               ]
            }
            ]
            
  
          },
          {
            nome:"Nome",
            colecoes:[
              {
                nome:"Nome",
                produto:[
                  {
                    nome:"Nome",
                    preco:45,
                    id:2,
                    img:""
  
                 }
               ]
            },
              {
                nome:"Nome",
                produto:[
                  {
                    nome:"Nome",
                    preco:45,
                    id:2,
                    img:""
  
                 }
               ]
            }
            ]
       
          }
        ]
      },
      user:{
       username:req.session.user.username,
         encomenda:{
  
         },
         compra:{
  
        }
  
      },
        compra:{
  
       }
  
     })
  })


  router.get('/', (req, res, next) => {

    res.render('users/index')
  })

  

module.exports = router
