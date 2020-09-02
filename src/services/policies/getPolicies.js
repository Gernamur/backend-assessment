import axios from 'axios'
import { to } from '../../await-to.js'

const getPolicies = async () => {
    let [result, err] = await to(axios.get(process.env.POLICIES_SRC))
    if (err) return undefined
    return result.data.policies
}

export { getPolicies }