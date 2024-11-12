const bcrypt = require('bcrypt');
const password = "professeur";
bcrypt.hash(password, 10).then(hash => {
    console.log(hash);
});