import { AxiosResponse } from "axios"

export interface ServiceReqBuilder {
    url: string,
    version: number,
    applicationId: string
    num: (query: numRequestQuery) => Promise<AxiosResponse<any>>,
    diff: (query: diffRequestQuery) => Promise<AxiosResponse<any>>,
    name: (query: nameRequestQuery) => Promise<AxiosResponse<any>>,
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
