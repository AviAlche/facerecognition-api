const handleProfile = (req, res, db) => {
    const { id } = req.params;
    db.select('*').from('users').where({id:id})
    .then(users => res.json(users[0]))
    .catch(error => res.status('404').json('userid not found'));
};

module.exports = {
    handleProfile: handleProfile
}