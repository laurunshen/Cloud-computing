var Todo = require('./models/todo');

function getTodos(res) {
    Todo.find(function (err, todos) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(todos); // return all todos in JSON format
    });
};
// 条件查询
function getAccount(account,res){
    var whereStr={"account":account};
    var set={$set:{"password":"2"}};
    Todo.update(whereStr,set);
    Todo.find(whereStr,function(err,todos){
        if(err){
            res.send(err);
        }
        res.json(todos);
    })
}
//更新存款
function updateBalance(account,deposit,res){
    var whereStr={"account":account};
    var Account=Todo.find(whereStr);
    var balance=Account[0].balance+parseFloat(deposit);
    var set={$set:{balance:balance}};
    Todo.update(whereStr,set,function(err,todos){
        if(err){
            res.send(err);
        }
        res.json(todos);
    })
}
module.exports = function (app) {

    // api ---------------------------------------------------------------------
    // get all todos
    app.get('/api/todos', function (req, res) {
        // use mongoose to get all todos in the database
        getTodos(res);
    });

    // create todo and send back all todos after creation
    app.post('/api/todos', function (req, res) {

        // 注册
        if((req.body.name!=undefined)&&(req.body.account!=undefined)&&(req.body.password!=undefined)){
        Todo.create({
            account: req.body.account,
            password: req.body.password,
            name:req.body.name,
            done: false
        }, function (err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            getTodos(res);
        });}
        else if((req.body.account!=undefined)&&(req.body.password!=undefined)){
            getAccount(req.body.account,res);
        }
        else if((req.body.deposit)!=undefined){
            updateBalance(req.body.account,req.body.deposit,res);
        }

    });

    // delete a todo
    app.delete('/api/todos/:todo_id', function (req, res) {
        Todo.remove({
            _id: req.params.todo_id
        }, function (err, todo) {
            if (err)
                res.send(err);

            getTodos(res);
        });
    });

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};
