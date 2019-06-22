import { HoujinBangou } from "../src/index"

const APPLICATION_ID: string = process.env.API_HOUJIN_BANGOU_ID!

const name = HoujinBangou(APPLICATION_ID).name


test('request to /name', async () => {
    const result = await name({ name: "神宮", type: "02", mode: "2" })
    console.log(result.data)
    expect(1).toBe(1)
})


