import bcrypt from 'bcrypt'

const users = [
    {
        name: 'Admin user',
        email: 'admin@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        isAdnin: true
    },
    {
        name: 'Jhon Doe',
        email: 'jhon@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        isAdnin: true
    },
    {
        name: 'Jane Doe',
        email: 'jane@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        isAdnin: true
    },
]

export default users