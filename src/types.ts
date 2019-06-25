import { AxiosResponse } from "axios"

export interface ServiceReqBuilder {
    version: number,
    applicationId: string
    num: (query: numRequestQuery) => Promise<HBResponse<any>>,
    diff: (query: diffRequestQuery) => Promise<HBResponse<any>>,
    name: (query: nameRequestQuery) => Promise<HBResponse<any>>,
}

export interface HBResponse<T=any> extends AxiosResponse<any>{
    data: responseData
}

export type numRequestQuery = {
    number: string | string[],
    type: "01" | "02" | "12" | number,
    history?: "0" | "1" | number
}

export type diffRequestQuery = {
    from: string,
    to: string,
    type: "01" | "02" | "12" | number,
    address?: string,
    kind?: "01" | "02" | "03" | "04" | number,
    divide?: string | number
}

export type nameRequestQuery = {
    name: string,
    type: "01" | "02" | "12" | number,
    mode?: "1" | "2",
    target?: "1" | "2" | "3" | number,
    address?: string | number,
    kind?: "01" | "02" | "03" | "04" | number,
    change?: "0" | "1" | number,
    close?: "0" | "1" | number,
    from?: string,
    to?: string,
    divide?: string | number
}

export type responseData = {
    corporations: {
        lastUpdateDate: Date,
        count: number,
        divideNumber: number,
        divideSize: number,
        corporation?: corporation[],
    }
}

type corporation = {
    sequenceNumber: number,
    corporateNumber: number,
    process: "01" | "11" | "12" | "13" | "21" | "22" | "77" | "72" | "81" | "99",
    correct: "0" | "1",
    updateDate: Date,
    changeDate: Date,
    name: string,
    nameImageId: number,
    kind: "101" | "201" | "301" | "302" | "303" | "304" | "305" | "399" | "401" | "499",
    prefectureName: string,
    cityName: string,
    streetNumber: string,
    addressImageId: number,
    prefectureCode: number,
    cityCode: number,
    postCode: number,
    addressOutside: string,
    addressoutsideImageId: number,
    closeDate: Date,
    closeCause: "01" | "11" | "21" | "31",
    successorCorporateNumber: number,
    changeCause: string,
    assignmentDate: Date,
    latest: "0" | "1",
    enName: string,
    enPrefectureName: string,
    enCityName: string,
    enAddressOutside: string,
    furigana: string,
    hihyoji: "0" | "1"
}
