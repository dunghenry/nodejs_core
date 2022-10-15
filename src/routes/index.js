const site = require('./site.route');
const book = require('./apis/book.route');
const data = require('./apis/data.route');
const test = require('./apis/test.route');
const auth = require('./apis/auth.route');
const upload = require('./upload.route');
const userSequelize = require('./apis/user.sequelize.route');
const routes = (app) => {
    app.use('/', site);
    app.use('/', upload);
    app.use('/api/data', data);
    app.use('/api/books', book);
    app.use('/api/test', test);
    app.use('/api/auth', auth);
    app.use('/api/sequelize/users', userSequelize);
};

module.exports = routes;
