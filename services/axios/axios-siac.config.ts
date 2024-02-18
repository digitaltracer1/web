import axios from 'axios'

const username = 'dgt'
const password = 'Dgt@server'
const token = Buffer.from(`${username}:${password}`, 'utf8').toString('base64')

const siac = axios.create({
  baseURL: 'https://3365281fab2c-705936598791469068.ngrok-free.app/api',
  timeout: 10000,
  headers: {
    Authorization: `Basic ${token}`,
  },
})

export default siac
