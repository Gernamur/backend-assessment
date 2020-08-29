import axios from 'axios'

const getPolicyById = (id) => id ?
    axios.get(process.env.POLICIES_SRC)
        .then(
            result => result.data.policies.find(x => x.id == id)
        )
    : undefined
    
export { getPolicyById }