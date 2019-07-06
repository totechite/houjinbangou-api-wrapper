import HoujinBangou, { corporation }  from "../src/index"

const APPLICATION_ID: string = process.env.API_HOUJIN_BANGOU_ID!

const num = new HoujinBangou(APPLICATION_ID).num

test('request to /num', async () => {
    let result = await num({ number: "5050005005266" })
    let cityName = (<corporation>result.data.corporations.corporation).cityName
    expect("つくば市").toBe(cityName)
})
