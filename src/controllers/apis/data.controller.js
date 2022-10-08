const axios = require('axios');
const client = require('../../configs/connect.redis');
const dataController = {
    getComments: async (req, res) => {
        try {
            const response = await axios.get(
                'https://jsonplaceholder.typicode.com/comments',
            );
            if (response.data) {
                return res.status(200).json(response.data);
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: error.message });
        }
    },
    getTodos: async (req, res) => {
        try {
            const todos = await client.get('todos');
            if (todos) {
                return res.status(200).json(JSON.parse(todos));
            } else {
                const response = await axios.get(
                    'https://jsonplaceholder.typicode.com/todos',
                );
                await client.set('todos', JSON.stringify(response.data));
                return res.status(200).json(response.data);
            }
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
};

module.exports = dataController;
