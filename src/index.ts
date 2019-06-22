import * as axios from "axios";
import * as url from "url"
import { HOUJINBANGOU_API_BASE_URL, ENDPOINTS } from "./constants"
// import {
//     ServiceReqBuilder,
//     diffRequestQuery,
//     nameRequestQuery,
//     numRequestQuery
// } from "./types"

/**
 * 
 * @param applicationId 
 * @param versionNumber 
 */
export function HoujinBangou(applicationId: string, versionNumber: number = 4): ServiceReqBuilder {

    /**
     * 
     * @param endpoint 
     */
    async function getUrlObject(endpoint: ENDPOINTS): Promise<url.UrlWithParsedQuery> {
        let url_obj = url.parse(HOUJINBANGOU_API_BASE_URL, true)
        url_obj.pathname = `/${versionNumber}${endpoint}`
        url_obj.query = { "id": applicationId }
        return url_obj
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
    async function num(query: numRequestQuery): Promise<axios.AxiosResponse<any>> {
        let get_url_obj = getUrlObject(ENDPOINTS.Num)
        // translate to string
        if (typeof query.number !== "string") {
            query.number = query.number.join(",")
        }
        if (typeof query.type === "number") {
            query.type = query.type.toString().padEnd(2, "0") as "01" | "02" | "12"
        }

        // generate query what contain both that Required and Optional,
        const queryObject = (async (): Promise<{}> => {
            let required_query = { "id": applicationId, "number": query.number, "type": query.type }
            return (await addOptionalArgs(required_query))([["history", query.history]])
        })()

        let url_obj = await get_url_obj
        url_obj.query = await queryObject
        return axios.default.get(url.format(url_obj)).then(res => res).catch(err => err)
    }

    /**
     * 
     * @param query 
     */
    async function diff(query: diffRequestQuery): Promise<axios.AxiosResponse<any>> {
        let get_url_obj = getUrlObject(ENDPOINTS.Diff)

        // translate to string
        if (typeof query.type === "number") {
            query.type = query.type.toString().padEnd(2, "0") as "01" | "02" | "12"
        }
        if (typeof query.kind === "number") {
            query.kind = query.kind.toString().padEnd(2, "0") as "01" | "02" | "03" | "04"
        }

        // generate query what contain both that Required and Optional,
        let queryObject = (async (): Promise<{}> => {
            let required_query = { "id": applicationId, "from": query.from, "to": query.to, "type": query.type }
            return (await addOptionalArgs(required_query))([["address", query.address], ["kind", query.kind], ["divide", query.divide]])
        })()

        let url_obj = await get_url_obj
        url_obj.query = await queryObject
        return axios.default.get(url.format(url_obj)).then(res => res).catch(err => err)
    }

    /**
     * 
     * @param query 
     */
    async function name(query: nameRequestQuery): Promise<axios.AxiosResponse<any>> {
        let get_url_obj = getUrlObject(ENDPOINTS.Name)

        // translate to string
        if (typeof query.type === "number") {
            query.type = query.type.toString().padEnd(2, "0") as "01" | "02" | "12"
        }
        if (typeof query.kind === "number") {
            query.kind = query.kind.toString().padEnd(2, "0") as "01" | "02" | "03" | "04"
        }

        // generate query what contain both that Required and Optional,
        let queryObject = (async (): Promise<{}> => {
            let required_query = { "id": applicationId, "name": query.name, "type": query.type }
            return (await addOptionalArgs(required_query))([["mode", query.mode], ["target", query.target], ["address", query.address], ["kind", query.kind], ["change", query.change], ["close", query.close], ["from", query.from], ["to", query.to], ["divide", query.divide]])
        })()

        let url_obj = await get_url_obj
        url_obj.query = await queryObject
        return axios.default.get(url.format(url_obj)).then(res => res).catch(err => err)
    }

    return {
        url: HOUJINBANGOU_API_BASE_URL,
        version: versionNumber,
        applicationId: applicationId,
        num: num,
        diff: diff,
        name: name
    }
}

