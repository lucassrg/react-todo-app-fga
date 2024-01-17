const PORT = process.env.PORT ?? 8000
const express = require('express')
const sqlite3 = require('sqlite3').verbose()
const cors = require('cors')
// const { v4: uuidv4 } = require('uuid')
const app = express()
const todo_db_path = './todos.db';

app.use(cors())
app.use(express.json())


// let db = new sqlite3.Database(':memory:', (err) => {
let db = new sqlite3.Database(todo_db_path, (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the todos.db SQlite database.');
});

//delete a todo

app.delete('/todos/:id', async (req, res) => {
    const { id } = req.params
    console.log("delete ID", id);

    db.run(`DELETE from todos where id = ? `,
        [id], function (error) {
            if (error) {
                console.error(error.message);
            }
            console.log(`Deleted task with the ID: ${id}`);
            res.send("Task successfully deleted");
        });
});

//update a new todo
app.put('/todos/:id', async (req, res) => {
    console.log("req.body", req.body);
    const { id, owner, priority, status } = req.body

    db.run(`UPDATE todos SET 
        owner = ?,        
        status = ?, 
        priority = ? where id = ?`,
        [owner, status, priority, id], function (error) {
            if (error) {
                console.error(error.message);
            }
            console.log(`Row(s) updated: ${this.changes}`);
            if (this.changes > 0) {
                db.get(`SELECT * FROM todos where id = ${id}`, (err, row) => {
                    if (err) {
                        console.error(err);
                    }
                    res.send(row);
                });
            }

        });
});


//create a new todo
app.post('/todos', async (req, res) => {
    console.log("req.body", req.body);
    const { owner, title, priority, create_date, status } = req.body


    db.run(`INSERT INTO todos(owner, title, create_date, status, priority) VALUES (?, ?, datetime(?), ?, ?)`,
        [owner, title, create_date, status, priority], function (error) {
            if (error) {
                console.error(error.message);
            }
            console.log(`Inserted task with the ID: ${this.lastID}`);
            db.get(`SELECT * FROM todos where rowid = ${this.lastID}`, (err, row) => {
                if (err) {
                    console.error(err);
                }
                res.send(row);
            });

        });
});

//retrieve a list of todos for the user
app.get('/todos/:user', async (req, res) => {
    // console.log("calling todos for user", req);
    const { user } = req.params
    console.log("user", user);
    db.all(`SELECT * FROM todos where owner=$user`, { $user: user }, (error, rows) => {
        if (error) {
            console.error(error.message);
        }
        console.log("rows", rows);
        res.send(rows);
    })
});


app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));

// try {
//     app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))
// } finally {
//     db.close((err) => {
//         if (err) {
//             return console.error(err.message);
//         }
//         console.log('Close the database connection.');
//     });
// }
