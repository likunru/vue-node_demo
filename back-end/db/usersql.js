let UserSQL = {
    insert:'INSERT INTO test_user(id,name) VALUES(?,?)', 
    queryAll:'SELECT * FROM test_user',  
    getUserById:'SELECT * FROM test_user WHERE id = ? '
}

module.exports = UserSQL