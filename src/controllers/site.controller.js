const User = require('../models/user.model');
class siteController {
    static async getHomePage(req, res) {
        // await User.create({
        //   name: "Dung",
        //   email: "trandungksnb00@gmail.com",
        //   age: 22
        // });
        const data = await User.findAll();
        return res.status(200).json(data);
        // console.log(JSON.stringify(data));
        return res.render('index', {
            title: 'HomePage',
        });
    }
}

module.exports = siteController;
