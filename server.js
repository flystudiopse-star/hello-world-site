const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'visits.json');

function readVisits() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading visits:', err);
  }
  return { count: 0 };
}

function writeVisits(data) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Error writing visits:', err);
  }
}

app.get('/api/visits', (req, res) => {
  const data = readVisits();
  res.json({ visits: data.count });
});

app.post('/api/visits', (req, res) => {
  const data = readVisits();
  data.count += 1;
  data.lastVisit = new Date().toISOString();
  writeVisits(data);
  res.json({ visits: data.count });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});