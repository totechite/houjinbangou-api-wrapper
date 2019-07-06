import HoujinBangou, { ResponseData, nameRequestQuery } from "../src/index"

const APPLICATION_ID: string = process.env.API_HOUJIN_BANGOU_ID!

const name = new HoujinBangou(APPLICATION_ID).name;

(async () => {
    const result = await name({ name: "神宮", mode: "2", type: 12 });
    console.log(APPLICATION_ID)
    console.log(result.data.corporations.corporation)
})()


