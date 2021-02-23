/*fetch('https://jsonplaceholder.typicode.com/posts', {
  method: "POST",
  body: JSON.stringify(_data),
  headers: {"Content-type": "application/json; charset=UTF-8"}
})
.then(response => response.json()) 
.then(json => console.log(json));
.catch(err => console.log(err));*/

/*axios.post('http://localhost:1337/auth/local/register', {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    Nome: req.body.nome
    })
    .then(response => {
    // Handle success.
    console.log('Well done!');
    console.log('User profile', response.data.user);
    console.log('User token', response.data.jwt);
    res.locals.user =  response.data.user;
    res.locals.jwt =  response.data.jwt;
    res.user =  response.data.user;
    res.jwt =  response.data.jwt;
    res.redirect("http://localhost:3000/");
    })
    .catch(error => {
    // Handle error.
    console.log('An error occurred:', error.response);
    });
     //console.log(req.body)
     */
    const form = document.getElementById('register');
    const nome = document.getElementById('nome');
    const usernome = document.getElementById('usernome');
    const email = document.getElementById('email');
    const senha = document.getElementById('senha');
    

    form.addEventListener('submit', logSubmit);
    function logSubmit(event) {
        
        event.preventDefault();
        console.log({
            
                username: usernome.value,
                email: email.value,
                password: senha.value,
                Nome: nome.value
            }
        )

    fetch('http://localhost:1337/auth/local/register', {
        method: "POST",
        body:{
            
                username: usernome.value,
                email: email.value,
                password: senha.value,
                Nome: nome.value
            },
        headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then(response => response.json()) 
        .catch(err => console.log(err));

      }
      
 