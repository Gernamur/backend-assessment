import axios from 'axios'
import { to } from '../../await-to.js'

const getPolicyById = async (id) => {
    if (!id) return undefined
    
    let [result, err] = await to(axios.get(process.env.POLICIES_SRC))
    if (err) return undefined
    return result.data.policies.find(x => x.id === id)
}

export { getPolicyById }