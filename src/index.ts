import * as axios from "axios";
import * as url from "url"
import * as xml2json from "xml2json"
import { HOUJINBANGOU_API_BASE_URL, ENDPOINTS } from "./constants"
import {
    ServiceReqBuilder,
    diffRequestQuery,
    nameRequestQuery,
    numRequestQuery,
    HBResponse,
    ResponseData
} from "./types"

/**
 * 
 * @param applicationId 
 * @param versionNumber 
 */
export function HoujinBangou(applicationId: string, option: { versionNumber: number, JSON: boolean } = { versionNumber: 4, JSON: false }): ServiceReqBuilder {


    /**
     * 
     * @param endpoint 
     */
    async function getUrlObject(endpoint: ENDPOINTS): Promise<url.UrlWithParsedQuery> {
        let url_obj = url.parse(HOUJINBANGOU_API_BASE_URL, true)
        url_obj.pathname = `/${option.versionNumber}${endpoint}`
        url_obj.query = { "id": applicationId }
        return url_obj
    }

    /**
     * 
     * @param num 
     */
    function zero_pad(num: number): string {
        return num.toString().padStart(2, "0")
    }

    /**
     * 
     * @param query_obj 
     */
    async function addOptionalArgs(query_obj: object): Promise<(optionalArg: [string, any][]) => object> {
        return ((optionalArgs: [string, any][]): {} => {
            optionalArgs.forEach((arg: [string, any]) => {
                if (arg[1] !== undefined) {
                    Object.assign(query_obj, { [arg[0]]: arg[1].toString() })
                }
            })
            return query_obj
        })
    }

    /**
     * 
     * @param query 
     */
    async function num(query: numRequestQuery): Promise<HBResponse<any>> {
        let get_url_obj = getUrlObject(ENDPOINTS.Num)
        // translate to string
        if (typeof query.number !== "string") {
            query.number = query.number.join(",")
        }
        if (typeof query.type === "number") {
            query.type = query.type.toString().padStart(2, "0") as "01" | "02" | "12"
        }

        // generate query what contain both that Required and Optional,
        const queryObject = (async (): Promise<{}> => {
            let required_query = { "id": applicationId, "number": query.number, "type": query.type }
            return (await addOptionalArgs(required_query))([["history", query.history]])
        })()

        let url_obj = await get_url_obj
        url_obj.query = await queryObject
        return axios.default.get(url.format(url_obj)).then(res => {
            res.data = JSON.parse(xml2json.toJson(res.data))
            return res
        }).catch(err => err)
    }

    /**
     * 
     * @param query 
     */
    async function diff(query: diffRequestQuery): Promise<HBResponse<any>> {
        let get_url_obj = getUrlObject(ENDPOINTS.Diff)

        // translate to string
        if (typeof query.type === "number") {
            query.type = zero_pad(query.type) as "01" | "02" | "12"
        }
        if (typeof query.kind === "number") {
            query.kind = zero_pad(query.kind) as "01" | "02" | "03" | "04"
        }
        if (typeof query.from !== "string") {
            query.from = [
                zero_pad(query.from.getFullYear()),
                zero_pad(query.from.getMonth()),
                zero_pad(query.from.getDate())
            ].join("-")
        }
        if (typeof query.to !== "string") {
            query.to = [
                zero_pad(query.to.getFullYear()),
                zero_pad(query.to.getMonth()),
                zero_pad(query.to.getDate())
            ].join("-")
        }

        // generate query what contain both that Required and Optional,
        let queryObject = (async (): Promise<{}> => {
            let required_query = { "id": applicationId, "from": query.from, "to": query.to, "type": query.type }
            return (await addOptionalArgs(required_query))([["address", query.address], ["kind", query.kind], ["divide", query.divide]])
        })()

        let url_obj = await get_url_obj
        url_obj.query = await queryObject
        return axios.default.get(url.format(url_obj)).then(res => {
            res.data = JSON.parse(xml2json.toJson(res.data))
            return res
        }).catch(err => err)
    }

    /**
     * 
     * @param query 
     */
    async function name(query: nameRequestQuery): Promise<HBResponse<any>> {
        let get_url_obj = getUrlObject(ENDPOINTS.Name)

        // translate to string
        if (typeof query.type === "number") {
            query.type = zero_pad(query.type) as "01" | "02" | "12"
        }
        if (typeof query.kind === "number") {
            query.kind = zero_pad(query.kind) as "01" | "02" | "03" | "04"
        }
        if (typeof query.from !== "undefined") {
            if (typeof query.from !== "string") {
                query.from = [
                    zero_pad(query.from.getFullYear()),
                    zero_pad(query.from.getMonth()),
                    zero_pad(query.from.getDate())
                ].join("-")
            }
        }
        if (typeof query.to !== "undefined") {
            if (typeof query.to !== "string") {
                query.to = [
                    zero_pad(query.to.getFullYear()),
                    zero_pad(query.to.getMonth()),
                    zero_pad(query.to.getDate())
                ].join("-")
            }
        }
        // generate query what contain both that Required and Optional,
        let queryObject = (async (): Promise<{}> => {
            let required_query = { "id": applicationId, "name": query.name, "type": query.type }
            return (await addOptionalArgs(required_query))([["mode", query.mode], ["target", query.target], ["address", query.address], ["kind", query.kind], ["change", query.change], ["close", query.close], ["from", query.from], ["to", query.to], ["divide", query.divide]])
        })()
        
        let url_obj = await get_url_obj
        url_obj.query = await queryObject
        return axios.default.get(url.format(url_obj)).then(res => {
            res.data = JSON.parse(xml2json.toJson(res.data))
            return res
        }).catch(err => err)
    }

    return {
        version: option.versionNumber,
        applicationId: applicationId,
        num: num,
        diff: diff,
        name: name
    }
}
