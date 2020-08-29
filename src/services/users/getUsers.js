import axios from 'axios'
import { getPolicyById } from '../policies/getPolicyById.js'


const getUsers = ({ name, policyId }) =>
    Promise.all([
        axios.get(process.env.USERS_SRC),
        getPolicyById(policyId)
    ])
        .then(
            ([users, policy]) => {
                let result = users.data.clients

                if (policyId) result = result.filter(x => x.id == (policy || {}).clientId)
                if (name) result = result.filter(x => x.name.toLowerCase().includes(name.toLowerCase()))

                return result
            }
        )

export { getUsers }