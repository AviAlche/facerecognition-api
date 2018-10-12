const signinHandler = (req, res, db, bcrypt) => {
    const { email, password } = req.body;
    if (!email || !password){
        return res.status(400).json("bad credentials");
    }
    db('login').select('hash').where('email', email)
    .then(passwordFromDB => {
        if(bcrypt.compareSync(password,passwordFromDB[0].hash)){
            return (db('users').select('*').where('email',email))
                .then(user => {
                    res.json(user[0]);
                })
        } else {
            res.status('400').json('wrong credentials');
        }
    }).catch(err => res.status('400').json('wrong credentials'));
};

module.exports = {
    signinHandler : signinHandler
}