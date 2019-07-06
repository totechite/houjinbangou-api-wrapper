import * as axios from "axios";
import * as url from "url"
import * as xml2json from "xml2json"
import {
    HOUJINBANGOU_API_BASE_URL,
    ENDPOINTS
} from "./constants"
import {
    diffRequestQuery,
    nameRequestQuery,
    numRequestQuery,
    HBResponse,
    ResponseData,
} from "./types"

export {
    HOUJINBANGOU_API_BASE_URL,
    ENDPOINTS
} from "./constants"
export {
    diffRequestQuery,
    nameRequestQuery,
    numRequestQuery,
    ResponseData,
    corporation
} from "./types"

export default class HoujinBangouWithJsonResponse {

    public applicationId: string;
    protected option: { versionNumber?: number, JSON?: boolean };
    protected self: HoujinBangouWithJsonResponse = this;

    protected getUrlObject = async (endpoint: ENDPOINTS): Promise<url.UrlWithParsedQuery> => {
        let url_obj = url.parse(HOUJINBANGOU_API_BASE_URL, true)
        url_obj.pathname = `/${this.option.versionNumber}${endpoint}`
        url_obj.query = { "id": this.applicationId }
        return url_obj
    }

    protected zero_pad(num: number): string {
        return num.toString().padStart(2, "0")
    }

    protected async addOptionalArgs(query_obj: object): Promise<(optionalArg: [string, any][]) => object> {
        return ((optionalArgs: [string, any][]): {} => {
            optionalArgs.forEach((arg: [string, any]) => {
                if (arg[1] !== undefined) {
                    Object.assign(query_obj, { [arg[0]]: arg[1].toString() })
                }
            })
            return query_obj
        })
    }

    constructor(applicationId: string, option: { versionNumber?: number } = { versionNumber: 4 }) {

        this.applicationId = applicationId
        this.option = { versionNumber: option.versionNumber, JSON: true };
        this.self = this

    }

    /**
     * 生のレスポンスデータをJSON形式に変換するかどうか選択できる。デフォルトは有効状態です。  
     * @param true  
     * 有効にしてJSON形式で受け取る
     * @param false  
     * 無効にしてtypeクエリで指定するCSVかXMLかのいずれかの形式で受け取る
     */
    isJson(bool: boolean): HoujinBangouWithPlaneResponse | HoujinBangouWithJsonResponse {
        return bool ?
            this
            :
            new HoujinBangouWithPlaneResponse(this.applicationId, this.option)
    }

    /**
     * 法人番号を指定して情報を取得するリクエスト
     */
    num = async (query: numRequestQuery): Promise<HBResponse<ResponseData>> => {
        let get_url_obj = this.self.getUrlObject(ENDPOINTS.Num)
        // translate to string
        if (typeof query.number !== "string") {
            query.number = query.number.join(",")
        }
        if (typeof query.type === "number") {
            query.type = this.option.JSON ? "12" : this.zero_pad(query.type) as "01" | "02" | "12"
        } else if (typeof query.type === "undefined") {
            query.type = "12"
        }

        // generate query what contain both that Required and Optional,
        const queryObject = (async (): Promise<{}> => {
            let required_query = { "id": this.applicationId, "number": query.number, "type": query.type }
            return (await this.addOptionalArgs(required_query))([["history", query.history]])
        })()

        let url_obj = await get_url_obj
        url_obj.query = await queryObject
        return <Promise<HBResponse>>axios.default.get(url.format(url_obj)).then(res => {
            res.data = this.option.JSON ? <ResponseData>JSON.parse(xml2json.toJson(res.data)) : <any>res.data
            return <HBResponse>res
        }).catch(err => err)
    }

    /**
     * 取得期間を指定して情報を取得するリクエスト
     */
    diff = async (query: diffRequestQuery): Promise<HBResponse<ResponseData>> => {
        let get_url_obj = this.self.getUrlObject(ENDPOINTS.Diff)

        // translate to string
        if (typeof query.type === "number") {
            query.type = this.option.JSON ? "12" : this.zero_pad(query.type) as "01" | "02" | "12"
        } else if (typeof query.type === "undefined") {
            query.type = "12"
        }
        if (typeof query.kind === "number") {
            query.kind = this.zero_pad(query.kind) as "01" | "02" | "03" | "04"
        }
        if (typeof query.from !== "string") {
            query.from = [
                this.zero_pad(query.from.getFullYear()),
                this.zero_pad(query.from.getMonth()),
                this.zero_pad(query.from.getDate())
            ].join("-")
        }
        if (typeof query.to !== "string") {
            query.to = [
                this.zero_pad(query.to.getFullYear()),
                this.zero_pad(query.to.getMonth()),
                this.zero_pad(query.to.getDate())
            ].join("-")
        }

        // generate query what contain both that Required and Optional,
        let queryObject = (async (): Promise<{}> => {
            let required_query = { "id": this.applicationId, "from": query.from, "to": query.to, "type": query.type }
            return (await this.addOptionalArgs(required_query))([["address", query.address], ["kind", query.kind], ["divide", query.divide]])
        })()

        let url_obj = await get_url_obj
        url_obj.query = await queryObject
        return axios.default.get(url.format(url_obj)).then(res => {
            res.data = this.option.JSON ? <ResponseData>JSON.parse(xml2json.toJson(res.data)) : res.data
            return res
        }).catch(err => err)
    }

    /**
     * 法人名を指定して情報を取得するリクエスト
     */
    name = async (query: nameRequestQuery): Promise<HBResponse<ResponseData>> => {
        let get_url_obj = this.self.getUrlObject(ENDPOINTS.Name)

        // translate to string
        if (typeof query.type === "number") {
            query.type = this.option.JSON ? "12" : this.zero_pad(query.type) as "01" | "02" | "12"
        } else if (typeof query.type === "undefined") {
            query.type = "12"
        }
        if (typeof query.kind === "number") {
            query.kind = this.zero_pad(query.kind) as "01" | "02" | "03" | "04"
        }
        if (typeof query.from !== "undefined") {
            if (typeof query.from !== "string") {
                query.from = [
                    this.zero_pad(query.from.getFullYear()),
                    this.zero_pad(query.from.getMonth()),
                    this.zero_pad(query.from.getDate())
                ].join("-")
            }
        }
        if (typeof query.to !== "undefined") {
            if (typeof query.to !== "string") {
                query.to = [
                    this.zero_pad(query.to.getFullYear()),
                    this.zero_pad(query.to.getMonth()),
                    this.zero_pad(query.to.getDate())
                ].join("-")
            }
        }

        // generate query what contain both that Required and Optional,
        let queryObject = (async (): Promise<{}> => {
            let required_query = { "id": this.applicationId, "name": query.name, "type": query.type }
            return (await this.addOptionalArgs(required_query))([["mode", query.mode], ["target", query.target], ["address", query.address], ["kind", query.kind], ["change", query.change], ["close", query.close], ["from", query.from], ["to", query.to], ["divide", query.divide]])
        })()

        let url_obj = await get_url_obj
        url_obj.query = await queryObject
        return axios.default.get(url.format(url_obj)).then(res => {
            res.data = this.option.JSON ? <ResponseData>JSON.parse(xml2json.toJson(res.data)) : <any>res.data
            return res
        }).catch(err => err)
    }

}



// [hack]　num, diff, nameは実装の都合上、
// 関数オブジェクトのプロパティとして宣言されている為superの呼び出しが出来ない。
// 継承しているのに同一のコードを再実装しているのはその為。

export class HoujinBangouWithPlaneResponse extends HoujinBangouWithJsonResponse {

    self: HoujinBangouWithPlaneResponse

    constructor(applicationId: string, option: { versionNumber?: number } = { versionNumber: 4 }) {
        super(applicationId, { versionNumber: option.versionNumber });
        this.option = { versionNumber: option.versionNumber, JSON: false }
        this.self = this
    }

    num = async (query: numRequestQuery): Promise<HBResponse<any>> => {
        let get_url_obj = this.self.getUrlObject(ENDPOINTS.Num)
        // translate to string
        if (typeof query.number !== "string") {
            query.number = query.number.join(",")
        }
        if (typeof query.type === "number") {
            query.type = this.option.JSON ? "12" : this.zero_pad(query.type) as "01" | "02" | "12"
        } else if (typeof query.type === "undefined") {
            query.type = "12"
        }

        // generate query what contain both that Required and Optional,
        const queryObject = (async (): Promise<{}> => {
            let required_query = { "id": this.applicationId, "number": query.number, "type": query.type }
            return (await this.addOptionalArgs(required_query))([["history", query.history]])
        })()

        let url_obj = await get_url_obj
        url_obj.query = await queryObject
        return <Promise<HBResponse>>axios.default.get(url.format(url_obj)).then(res => {
            res.data = this.option.JSON ? <ResponseData>JSON.parse(xml2json.toJson(res.data)) : <any>res.data
            return <HBResponse>res
        }).catch(err => err)
    }

    diff = async (query: diffRequestQuery): Promise<HBResponse<any>> => {
        let get_url_obj = this.self.getUrlObject(ENDPOINTS.Diff)

        // translate to string
        if (typeof query.type === "number") {
            query.type = this.option.JSON ? "12" : this.zero_pad(query.type) as "01" | "02" | "12"
        } else if (typeof query.type === "undefined") {
            query.type = "12"
        }
        if (typeof query.kind === "number") {
            query.kind = this.zero_pad(query.kind) as "01" | "02" | "03" | "04"
        }
        if (typeof query.from !== "string") {
            query.from = [
                this.zero_pad(query.from.getFullYear()),
                this.zero_pad(query.from.getMonth()),
                this.zero_pad(query.from.getDate())
            ].join("-")
        }
        if (typeof query.to !== "string") {
            query.to = [
                this.zero_pad(query.to.getFullYear()),
                this.zero_pad(query.to.getMonth()),
                this.zero_pad(query.to.getDate())
            ].join("-")
        }

        // generate query what contain both that Required and Optional,
        let queryObject = (async (): Promise<{}> => {
            let required_query = { "id": this.applicationId, "from": query.from, "to": query.to, "type": query.type }
            return (await this.addOptionalArgs(required_query))([["address", query.address], ["kind", query.kind], ["divide", query.divide]])
        })()

        let url_obj = await get_url_obj
        url_obj.query = await queryObject
        return axios.default.get(url.format(url_obj)).then(res => {
            res.data = this.option.JSON ? <ResponseData>JSON.parse(xml2json.toJson(res.data)) : res.data
            return res
        }).catch(err => err)
    }

    name = async (query: nameRequestQuery): Promise<HBResponse<any>> => {
        let get_url_obj = this.self.getUrlObject(ENDPOINTS.Name)

        // translate to string
        if (typeof query.type === "number") {
            query.type = this.option.JSON ? "12" : this.zero_pad(query.type) as "01" | "02" | "12"
        } else if (typeof query.type === "undefined") {
            query.type = "12"
        }
        if (typeof query.kind === "number") {
            query.kind = this.zero_pad(query.kind) as "01" | "02" | "03" | "04"
        }
        if (typeof query.from !== "undefined") {
            if (typeof query.from !== "string") {
                query.from = [
                    this.zero_pad(query.from.getFullYear()),
                    this.zero_pad(query.from.getMonth()),
                    this.zero_pad(query.from.getDate())
                ].join("-")
            }
        }
        if (typeof query.to !== "undefined") {
            if (typeof query.to !== "string") {
                query.to = [
                    this.zero_pad(query.to.getFullYear()),
                    this.zero_pad(query.to.getMonth()),
                    this.zero_pad(query.to.getDate())
                ].join("-")
            }
        }

        // generate query what contain both that Required and Optional,
        let queryObject = (async (): Promise<{}> => {
            let required_query = { "id": this.applicationId, "name": query.name, "type": query.type }
            return (await this.addOptionalArgs(required_query))([["mode", query.mode], ["target", query.target], ["address", query.address], ["kind", query.kind], ["change", query.change], ["close", query.close], ["from", query.from], ["to", query.to], ["divide", query.divide]])
        })()

        let url_obj = await get_url_obj
        url_obj.query = await queryObject
        return axios.default.get(url.format(url_obj)).then(res => {
            res.data = this.option.JSON ? <ResponseData>JSON.parse(xml2json.toJson(res.data)) : <any>res.data
            return res
        }).catch(err => err)
    }

}