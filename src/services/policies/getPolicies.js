import axios from 'axios'

const getPolicies = () =>
    axios.get(process.env.POLICIES_SRC)
        .then(
            result => result.data.policies
        )

export { getPolicies }