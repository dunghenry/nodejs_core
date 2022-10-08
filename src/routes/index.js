const site = require('./site.route');
const book = require('./apis/book.route');
const data = require('./apis/data.route');
const test = require('./apis/test.route');
const routes = (app) => {
    app.use('/', site);
    app.use('/api/data', data);
    app.use('/api/books', book);
    app.use('/api/test', test);
};

module.exports = routes;
