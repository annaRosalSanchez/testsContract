import axios, { AxiosPromise } from "axios"

export class CatFacts {
    private url: string
    private port: number

    constructor(endpoint: any) {
        this.url = endpoint.url
        this.port = endpoint.port
    }

    public getCatBreeds = (): AxiosPromise => {
        return axios.request({
            baseURL: `${this.url}:${this.port}`,
            headers: { Accept: "application/json" },
            method: "GET",
            url: "/breeds",
        })
    }

    public getCatFact = (): AxiosPromise => {
        return axios.request({
            baseURL: `${this.url}:${this.port}`,
            headers: { Accept: "application/json" },
            method: "GET",
            url: "/fact",
        })
    }
    public getCatFacts = (): AxiosPromise => {
        return axios.request({
            baseURL: `${this.url}:${this.port}`,
            headers: { Accept: "application/json" },
            method: "GET",
            url: "/facts",
        })
    }

}
