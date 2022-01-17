const app = require('./app');

// here is the data base. here is the change :)
 
require('./database')

// server listing
app.listen(app.get('port'), () => {
  console.log(`the server is listening on port http://localhost:${app.get('port')}`);
})
