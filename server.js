const express = require('express');
const mysql = require('mysql');

const app = express();
const PORT = process.env.PORT || 5000;
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'arif',
	password: '14101999',
	database: 'task_manager'
});

app.use(express.json());


// ======================= GET all tasks =======================
app.get('/', async (req, res) => {
	try {
		const sql = `SELECT * FROM tasks`;

		connection.query(sql, (err, result) => {
			if (err) throw err;

			res.send(result);
		});
	} catch (error) {
		next(error);
	}
});

// ===================== GET an specific task =====================
app.get('/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const sql = `SELECT * FROM tasks WHERE(id = ${id})`;

		connection.query(sql, (err, result) => {
			if (err) throw err;

			if (result.length == 0) {
				return res.send('No task found!!');
			}

			res.send(result);
		});
	} catch (error) {
		next(error);
	}
});

// ===================== CREATE task =====================
app.post('/create', async (req, res) => {
	try {
		let { title, completed } = req.body;
		completed = completed ? true : false;

		const sql = `INSERT INTO tasks (title, completed) VALUES ('${title}', ${completed})`;

		connection.query(sql, (err, result) => {
			if (err) throw err;

			res.send(result);
		});
	} catch (error) {
		next(error);
	}
});

// ===================== DELETE task =====================
app.delete('/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const sql = `DELETE FROM tasks WHERE(id = ${id})`;

		connection.query(sql, (err, result) => {
			if (err) {
				console.error(error);
				throw err;
			}

			res.send('Item deleted!');
		});
	} catch (error) {
		next(error);
	}
});

// ===================== UPDATE task =====================
app.patch('/:id', async (req, res, next) => {
	try {
		const { title, completed } = req.body;
		const { id } = req.params;

		let sql;
		if (title && completed) {
			sql = `UPDATE tasks SET title='${title}', completed=${completed}  WHERE(id = ${id})`;
		} else if (title) {
			sql = `UPDATE tasks SET title='${title}' WHERE(id = ${id})`;
		} else if (completed) {
			sql = `UPDATE tasks SET completed=${completed} WHERE(id = ${id})`;
		} else {
			res.send('Give something to update!!');
		}

		connection.query(sql, (err, result) => {
			if (err) {
				console.error(err);
				throw err;
			}

			res.send('Item updated!');
		});
	} catch (error) {
		next(error);
	}
});

app.listen(PORT, () => console.log('the app is running on port ' + PORT));
