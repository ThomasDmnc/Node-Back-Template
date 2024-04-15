import {expect, test} from 'vitest'

test('Get /api', async () => {
    const res = await fetch('http://localhost:5005/api/')
    const data = await res.json()
    expect(res.status).toBe(200)
    expect(data).toEqual('All good in here')
})

test('Get 404 error for weird route', async () => {
    const res = await fetch('http://localhost:5005/api/waLvMmbIo0')
    const data = await res.json()
    expect(res.status).toBe(404)
    expect(data).toEqual({message: 'This route does not exist'})
})