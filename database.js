const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('menuSelections.db');

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS selections (
        id INTEGER PRIMARY KEY, 
        item TEXT, 
        price DECIMAL(10,2),
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
    
    db.run(`CREATE TABLE IF NOT EXISTS prices (
        id INTEGER PRIMARY KEY,
        item TEXT UNIQUE,
        price DECIMAL(10,2),
        category TEXT
    )`);
    
    // Insert default prices with categories
    db.get("SELECT COUNT(*) as count FROM prices", [], (err, row) => {
        if (row.count === 0) {
            const defaults = [
                ['Coca Cola', 45, 'Soda'],
                ['Pepsi', 40, 'Soda'],
                ['Fanta', 45, 'Soda'],
                ['Tuborg Classic', 50, 'Beer'],
                ['Royal', 45, 'Beer'],
                ['Breezers Orange', 55, 'Alcohol'],
                ['Water', 20, 'Other']
            ];
            defaults.forEach(([item, price, category]) => {
                db.run("INSERT INTO prices (item, price, category) VALUES (?, ?, ?)", 
                    [item, price, category]);
            });
        }
    });
});

// Database functions
const databaseAPI = {
    getPrices: () => {
        return new Promise((resolve, reject) => {
            db.all("SELECT * FROM prices", [], (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    },

    saveSelection: (item) => {
        return new Promise((resolve, reject) => {
            db.run(
                "INSERT INTO selections (item, price) VALUES (?, ?)",
                [item.name, item.price],
                function(err) {
                    if (err) reject(err);
                    else resolve(this.lastID);
                }
            );
        });
    }
};

module.exports = databaseAPI;
