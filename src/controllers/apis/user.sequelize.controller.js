const User = require('../../models/user.sequelize');
const userSequelizeController = {
    getUsers: async (req, res) => {
        try {
            const users = await User.findAll();
            return res.status(200).json(users);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: error.message });
        }
    },
    getUserById: async (req, res) => {
        const { id } = req.params;
        try {
            const user = await User.findOne({ where: { id } });
            if (user) {
                return res.status(200).json(user);
            } else {
                return res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: error.message });
        }
    },
    deleteUserById: async (req, res) => {
        const { id } = req.params;
        try {
            const user = await User.findOne({ where: { id } });
            if (user) {
                const rs = await User.destroy({ where: { id } });
                if (res === 1) {
                    return res
                        .status(200)
                        .json({ message: 'Deleted user successfully' });
                } else {
                    return res
                        .status(400)
                        .json({ message: 'Deleted user failure' });
                }
            } else {
                return res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: error.message });
        }
    },
    createUser: async (req, res) => {
        const { name, email, age } = req.body;
        if (!name || !email || !age) {
            return res
                .status(400)
                .json({ message: 'Name, email and age required' });
        }
        try {
            const user = await User.findOne({ where: { email } });
            if (user) {
                return res
                    .status(400)
                    .json({ message: 'Email is already used' });
            } else {
                const newUser = await User.create({
                    name,
                    email,
                    age: +age,
                });
                return res.status(201).json(newUser);
            }
        } catch (error) {}
        console.log(error);
        return res.status(500).json({ message: error.message });
    },
    updateUserById: async (req, res) => {
        const { id } = req.params;
        const { name, email, age } = req.body;
        if (!name || !email || !age) {
            return res
                .status(400)
                .json({ message: 'Name, email and age required' });
        }
        try {
            const user = await User.findOne({ where: { id } });
            if (user) {
                const findUser = await User.findOne({ where: { email } });
                if (
                    findUser?.dataValues != null &&
                    findUser.dataValues.id !== +id
                ) {
                    return res
                        .status(400)
                        .json({ message: 'Email is already used' });
                } else {
                    const updateUser = await User.update(
                        { name, email, age },
                        { where: { id } },
                    );
                    return res
                        .status(200)
                        .json({ message: 'Updated user successfully' });
                }
            } else {
                return res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: error.message });
        }
    },
};

module.exports = userSequelizeController;
