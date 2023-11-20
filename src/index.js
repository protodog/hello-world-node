const express = require('express');
const app = express();
const port = 3000;

// Sample data for demonstration purposes
const users = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Doe' }
];

// Route to get a list of users
app.get('/users', (req, res) => {
  res.json(users);
});

// Route to get a specific user by ID
app.get('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(user => user.id === userId);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// Route to create a new user
app.post('/users', (req, res) => {
  // Assuming the request body contains JSON data with a "name" property
  const newUser = {
    id: users.length + 1,
    name: req.body.name
  };

  users.push(newUser);

  res.status(201).json(newUser);
});

// Route to update an existing user by ID
app.put('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(user => user.id === userId);

  if (user) {
    // Assuming the request body contains JSON data with an "updatedName" property
    user.name = req.body.updatedName;

    res.json(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// Route to delete a user by ID
app.delete('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex(user => user.id === userId);

  if (userIndex !== -1) {
    const deletedUser = users.splice(userIndex, 1)[0];
    res.json(deletedUser);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
