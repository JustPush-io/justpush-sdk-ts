import fetch, { Response, RequestInit } from 'node-fetch'

class JustPushBase {
    private static readonly JUSTPUSH_API_URL: string = 'https://api.justpush.io'
    private static readonly CLIENT_VERSION: string = '0.1'

    private headers: Record<string, string>
    private fetch: any

    constructor() {
        this.headers = {}
         // Dynamically import node-fetch in Node.js environment
         if (typeof window === 'undefined') {
            import('node-fetch').then(module => {
                this.fetch = module.default
            })
        } else {
            this.fetch = window.fetch.bind(window)
        }
    }

    public setToken(token: string): this {
        this.headers['Authorization'] = 'Bearer ' + token
        return this
    }

    private baseHeaders(): Record<string, string> {
        this.headers['Accept'] = 'application/json'
        this.headers['User-Agent'] =
            'JustPushAPIClient ' + JustPushBase.CLIENT_VERSION
        return this.headers
    }

    protected async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
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
            // Use the appropriate fetch implementation
            const fetchImpl = this.fetch || fetch
            const response: Response = await fetchImpl(url, fetchOptions)
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`)
            }
            return await response.json() as T
        } catch (error) {
            console.error('Error making request:', error)
            throw error
        }
    }
}

export default JustPushBase