import axios from 'axios'
import { to } from '../../await-to.js'

const getUserById = async (id) => {
    if (!id) return undefined
    let [result, err] = await to(axios.get(process.env.USERS_SRC))
    if (err) return undefined
    return result.data.clients.find(x => x.id === id)
}

export { getUserById }