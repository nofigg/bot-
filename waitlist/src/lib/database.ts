import sqlite3 from 'sqlite3';
import path from 'path';

const dbPath = path.resolve(process.cwd(), 'waitlist.db');
const db = new sqlite3.Database(dbPath);

// Initialize database
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS waitlist (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  )`, (err) => {
    if (err) {
      console.error('Error creating waitlist table:', err);
    } else {
      console.log('Waitlist table initialized successfully');
    }
  });
});

export function addToWaitlist(email: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const stmt = db.prepare('INSERT INTO waitlist (email) VALUES (?)');
    stmt.run(email, (err) => {
      if (err) {
        console.error('Error adding email to waitlist:', err);
        reject(false);
      } else {
        resolve(true);
      }
    });
    stmt.finalize();
  });
}

export function checkEmailExists(email: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM waitlist WHERE email = ?', [email], (err, row) => {
      if (err) {
        console.error('Error checking email:', err);
        reject(err);
      } else {
        resolve(!!row);
      }
    });
  });
}

// Close database connection on process exit
process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err);
    }
    process.exit(0);
  });
});
