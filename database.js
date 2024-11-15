const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('menuSelections.db');

db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS selections (id INTEGER PRIMARY KEY, item TEXT, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP)");
});

function saveSelection(item) {
    db.run("INSERT INTO selections (item) VALUES (?)", [item], function (err) {
        if (err) {
            return console.error(err.message);
        }
        console.log(`A row has been inserted with rowid ${this.lastID}`);
    });
}

module.exports = { saveSelection };
