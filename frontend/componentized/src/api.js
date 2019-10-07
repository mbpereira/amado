import axios from 'axios'

const context = 'http://localhost:5000'

export { context }
export default axios.create({
    baseURL: `${context}/api`
})