import axios from 'axios'

const context = 'http://10.0.107.248:5000'

export { context }
export default axios.create({
    baseURL: `${context}/api`
})