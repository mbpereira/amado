import axios from 'axios'

const context = 'http://192.168.1.53:5000'

export { context }
export default axios.create({
    baseURL: `${context}/api`
})