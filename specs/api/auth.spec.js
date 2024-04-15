import {expect, test} from 'vitest'
import axios from "axios";
import { post } from '../../routes/index.routes';

test('Get /api/auth', async () => {
    const res = await fetch('http://localhost:5005/api/auth')
    const data = await res.json()
    expect(res.status).toBe(200)
    expect(data).toEqual({message: 'All good from /api/auth'})
})

const goodCredentials = {
    email: "test@test.com",
    password: "Test1234!"
}

const badCredentials = {
    email: "test@test.com",
    password: "123"
}

test('Post /signup sucessful with valid email and password', async () => {
    const email = goodCredentials.email
    const password = goodCredentials.password
    const payload = {email, password}
    const res = await fetch('http://localhost:5005/api/auth/signup', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    const data = await res.json()
    expect(res.status).toBe(200)
    expect(data).toBeTypeOf('object')
    expect(data).toHaveProperty('user')
})

test('Post /signup error with existing email', async () => {
    const email = goodCredentials.email
    const password = goodCredentials.password
    const payload = {email, password}
    const res = await fetch('http://localhost:5005/api/auth/signup', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    const data = await res.json()
    expect(res.status).toBe(400)
    expect(data).toStrictEqual({ message: 'This user already exists' })
})

test('Post /signup error with missing email or password', async () => {
    const email = ""
    const password = goodCredentials.password
    const payload = {email, password}
    const res = await fetch('http://localhost:5005/api/auth/signup', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    const data = await res.json()
    expect(res.status).toBe(400)
    expect(data).toStrictEqual({ message: 'Please provide an email or a password' })
})

test('Post /signup error with invalid email', async () => {
    const email = "aaaaaaaaa.com"
    const password = goodCredentials.password
    const payload = {email, password}
    const res = await fetch('http://localhost:5005/api/auth/signup', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    const data = await res.json()
    expect(res.status).toBe(400)
    expect(data).toStrictEqual({ message: 'Please provide a valid email address' })
})

test('Post /signup error with password too short', async () => {
    const email = badCredentials.email
    const password = badCredentials.password
    const payload = {email, password}
    const res = await fetch('http://localhost:5005/api/auth/signup', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    const data = await res.json()
    expect(res.status).toBe(400)
    expect(data).toStrictEqual({ message: 'Please provide a valid password' })
})

test('Post /login sucessful', async () => {
    const email = goodCredentials.email
    const password = goodCredentials.password
    const payload = {email, password}
    const res = await fetch('http://localhost:5005/api/auth/login', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    const data = await res.json()
    expect(res.status).toBe(201)
    expect(data).toBeTypeOf('object')
    expect(data).toHaveProperty('token')
})

test('Post /login unsucessful', async () => {
    const email = goodCredentials.email
    const password = badCredentials.password
    const payload = {email, password}
    const res = await fetch('http://localhost:5005/api/auth/login', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    const data = await res.json()
    expect(res.status).toBe(400)
    expect(data).toStrictEqual({ message: 'Please provide an email or a password' })
})

test('Post /login error with missing email or password', async () => {
    const email = goodCredentials.email
    const password = goodCredentials.password
    const payload = {email, password}
    const res = await fetch('http://localhost:5005/api/auth/login', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    const data = await res.json()
    expect(res.status).toBe(400)
    expect(data).toStrictEqual({ message: 'Please provide an email or a password' })
})

test('Post /login error with not account created', async () => {
    const email = badCredentials.email
    const password = badCredentials.password
    const payload = {email, password}
    const res = await fetch('http://localhost:5005/api/auth/signup', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    const data = await res.json()
    expect(res.status).toBe(400)
    expect(data).toStrictEqual({ message: 'User not found.' })

})

// test('Get /verify successful', async () => {
//     const res = await fetch('http://localhost:5005/api/auth/signup', {
//         method: "POST",
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(payload)
//     })
//     const data = await res.json()
// })

// test('Get /verify unsuccessful', async () => {

//     const res = await fetch('http://localhost:5005/api/auth/signup', {
//         method: "POST",
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(payload)
//     })
//     const data = await res.json()
//     expect(res.status).toBe(401)
//     expect(data).toStrictEqual({message: 'Token is not provided or invalid'}))
// })