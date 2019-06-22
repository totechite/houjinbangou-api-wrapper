import { HoujinBangou } from "../src/index"

const APPLICATION_ID: string = process.env.API_HOUJIN_BANGOU_ID!

const num = HoujinBangou(APPLICATION_ID).num


test('request to /num', async () => {
    const result = await num({number: "5050005005266", type: "02"})
    console.log(result.data)
    expect(1).toBe(1)
})


