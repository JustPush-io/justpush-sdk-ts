import fetch, { RequestInit } from 'node-fetch'

export abstract class JustPushBase {
    static JUSTPUSH_API_URL = 'https://api.justpush.io'
    static CLIENT_VERSION = '0.1'

    protected headers: { [key: string]: string } = {}

    protected setToken(token: string): this {
        this.headers['Authorization'] = 'Bearer ' + token
        return this
    }

    protected baseHeaders(): { [key: string]: string } {
        this.headers['Accept'] = 'application/json'
        this.headers['User-Agent'] =
            'JustPushAPIClient ' + JustPushBase.CLIENT_VERSION
        return this.headers
    }

    protected async request(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<any> {
        const url = `${JustPushBase.JUSTPUSH_API_URL}${endpoint}`
        const headers = this.baseHeaders()

        const fetchOptions: RequestInit = {
            ...options,
            headers: {
                ...headers,
                ...options.headers,
            },
        }

        try {
            const response = await fetch(url, fetchOptions)
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`)
            }
            return await response.json()
        } catch (error) {
            console.error('Error making request:', error)
            throw error
        }
    }
}
