
# Setting DB connection

``` 
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'arif',
	password: '14101999',
	database: 'task_manager'
});
```

# GET ALL

```
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
```

# GET specific data
```
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

```
