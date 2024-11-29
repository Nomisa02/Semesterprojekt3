const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('menuSelections.db');

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS selections (
        id INTEGER PRIMARY KEY, 
        item TEXT, 
        price DECIMAL(10,2),
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
});

function saveSelection(item) {
    console.log('Saving item:', item); // Debug log

    if (!item.name || item.price === undefined) {
        console.error('Invalid item data:', item);
        return;
    }

    db.run(
        "INSERT INTO selections (item, price) VALUES (?, ?)", 
        [item.name, item.price], 
        function(err) {
            if (err) {
                console.error('Database error:', err.message);
                return;
            }
            console.log(`Saved: ${item.name} at ${item.price}kr with ID ${this.lastID}`);
        }
    );
}

// Add function to verify data
function getAllSelections() {
    db.all("SELECT * FROM selections", [], (err, rows) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('Current database contents:', rows);
    });
}

module.exports = { saveSelection, getAllSelections };
