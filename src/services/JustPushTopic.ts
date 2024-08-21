import { Topic } from '../types'
import { JustPushBase } from '../utils/JustPushBase'

class JustPushTopic extends JustPushBase {
    static ENDPOINT = '/topics'

    private topicParams: { [key: string]: any } = {}
    private topicUuid: string | null = null

    private constructor(token: string) {
        super()
        this.setToken(token)
    }

    static token(token = ''): JustPushTopic {
        return new JustPushTopic(token)
    }

    title(title: string = 'Default'): this {
        this.topicParams['title'] = title
        return this
    }

    topic(topicUuid: string | null = null): this {
        this.topicUuid = topicUuid
        return this
    }

    avatar(url: string | null = null, body: string | null = null): this {
        if (url && body) {
            throw new Error('Cannot set both URL and body for avatar')
        }

        if (url) {
            this.topicParams['avatar'] = { external_url: url }
        }

        if (body) {
            this.topicParams['avatar'] = { body: body }
        }

        return this
    }

    async create(): Promise<Topic> {
        return await this.request(JustPushTopic.ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.topicParams),
        })
    }

    async get(): Promise<Topic> {
        if (!this.topicUuid) {
            throw new Error('Topic UUID must be set before calling get.')
        }
        return await this.request(
            `${JustPushTopic.ENDPOINT}/${this.topicUuid}`,
            {
                method: 'GET',
            }
        )
    }

    // TODO: Recheck types after backend fix
    async update(): Promise<Topic> {
        if (!this.topicUuid) {
            throw new Error('Topic UUID must be set before calling update.')
        }

        return await this.request(
            `${JustPushTopic.ENDPOINT}/${this.topicUuid}`,
            {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(this.topicParams),
            }
        )
    }

    getTopicParams(): { [key: string]: any } {
        return this.topicParams
    }
}

export default JustPushTopic
