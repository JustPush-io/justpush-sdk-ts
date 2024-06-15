import { JustPushMessage } from './src/services/JustPushMessage'

const test = async () => {
    try {
        const justPushMessage = JustPushMessage.token(
            '7W6rAhothzVrT6CBqMmtPiDukjhWJXKU'
        )
            .topic('JavascriptSDK')
            .message('Here is a sample Message')
            .acknowledge(true, true, 'https://www.google.ro')
            .title('Test Title')
            .lowPriority()
            .button('Button 1', 'https://google.com', true)

        const response = await justPushMessage.create()
        console.log(
            'Message created successfully:',
            JSON.stringify(response, null, 2)
        )

        // Wait for 5 seconds
        await new Promise((resolve) => setTimeout(resolve, 10000))

        // Retrieve the message
        const messageKey = response.key
        const message = await JustPushMessage.token(
            '7W6rAhothzVrT6CBqMmtPiDukjhWJXKU'
        )
            .key(messageKey)
            .get()

        console.log('Fetched message data:', JSON.stringify(message, null, 2))
    } catch (error) {
        console.error('Error:', error)
    }
}

export { test }
