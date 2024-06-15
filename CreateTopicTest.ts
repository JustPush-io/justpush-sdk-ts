import { JustPushTopic } from './src/services/JustPushTopic'

const test = async () => {
    try {
        const justPushTopic = JustPushTopic.token(
            '7W6rAhothzVrT6CBqMmtPiDukjhWJXKU'
        ).title('JavascriptSDK')

        const response = await justPushTopic.create()
        console.log(
            'Topic created successfully:',
            JSON.stringify(response, null, 2)
        )

        // Wait for 5 seconds
        await new Promise((resolve) => setTimeout(resolve, 5000))

        // Retrieve the message
        const topicKey = response.uuid

        const topicGet = await JustPushTopic.token(
            '7W6rAhothzVrT6CBqMmtPiDukjhWJXKU'
        )
            .topic(topicKey)
            .get()

        console.log('Get topic data:', JSON.stringify(topicGet, null, 2))

        const topic = await JustPushTopic.token(
            '7W6rAhothzVrT6CBqMmtPiDukjhWJXKU'
        )
            .topic(topicKey)
            .update()

        console.log('Updated topic data:', JSON.stringify(topic, null, 2))
    } catch (error) {
        console.error('Error:', error)
    }
}

export { test }
