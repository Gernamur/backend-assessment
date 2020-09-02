import axios from 'axios'
import { toAll } from '../../await-to.js'
import { getPolicyById } from '../policies/getPolicyById.js'


const getUsers = async ({ name, policyId }) => {
    let [[users, policy], err] = await toAll([
        axios.get(process.env.USERS_SRC),
        getPolicyById(policyId)
    ])
    if (err) return undefined

    let result = users.data.clients

    if (policyId) result = result.filter(x => x.id === (policy || {}).clientId)
    if (name) result = result.filter(x => x.name.toLowerCase().includes(name.toLowerCase()))

    return result
}

export { getUsers }