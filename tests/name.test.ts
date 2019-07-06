import HoujinBangou, { HoujinBangouWithPlaneResponse } from "../src/index"

const APPLICATION_ID: string = process.env.API_HOUJIN_BANGOU_ID!

const name = (<HoujinBangouWithPlaneResponse> new HoujinBangou(APPLICATION_ID).isJson(false)).name

test('request to /name', async () => {
    let result = await name({ name: "神宮", mode: "2", type: 12 })
    expect(true).toBe(result.data!==undefined)
})


