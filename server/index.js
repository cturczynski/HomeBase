const express = require("express");
const path = require('path');
const employeeRouter = require("./routes/employee");
const shiftRouter = require("./routes/shift");

const PORT = process.env.PORT || 3001

const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: true,
}));

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get('/', (req, res) => {
    res.json({ message: "Hello, Casey. Keep working"});
});

app.use('/employee', employeeRouter);
app.use('/shift', shiftRouter);

//error handler middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ message: err.message });
    return;
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
})

module.exports = app;