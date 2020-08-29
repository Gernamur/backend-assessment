import axios from 'axios'

const getUserById = (id) => id ?
    axios.get(process.env.USERS_SRC)
        .then(
            result => result.data.clients.find(x => x.id == id)
        )
    : undefined
    
export { getUserById }