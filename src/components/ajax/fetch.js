fetch('https://jsonplaceholder.typicode.com/todos/')
  .then(response => response.json())
  .then(json => console.log(json))
  .catch( (err) =>{
      console.log('Error', err.message);
  })
