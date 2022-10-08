const client = require('../../configs/connect.redis');
const axios = require('axios');
class testController {
    static async getTodos(req, res) {
        const todos = await client.get('todos');
        const name = await client.get('name');
        console.log(name);
        try {
            console.log(todos);
            if (!todos) {
                const response = await axios.get(
                    'https://jsonplaceholder.typicode.com/todos',
                );
                console.log('Call');
                await client.set('todos', JSON.stringify(response.data));
                return res.status(200).json(response.data);
            } else {
                return res.status(200).json(JSON.parse(todos));
            }
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}
module.exports = testController;
