import JustPushMessage from '../services/JustPushMessage.js'
import { ACCESS_TOKEN } from './TestConstants.js'

const IMAGE_PAYLOAD: string[] = [
    'https://i2.wp.com/www.learnsteps.com/wp-content/uploads/2017/04/what-is-a-hyperlink-with-pictures-UDZ66a-clipart.jpg?fit=1000%2C740&ssl=1',
    'Test caption',
]

const sendSimpleTextMesage = async () => {
    console.log('Send simple text message...')
    return await JustPushMessage.token(ACCESS_TOKEN)
        .topic('TestTopic')
        .title('Test Title')
        .message('Here is a sample Message')
        .create()
}

const sendImageMesage = async () => {
    console.log('Send image message...')
    return await JustPushMessage.token(ACCESS_TOKEN)
        .topic('TestTopic')
        .title('Test Title')
        .message('Here is a massage with images')
        .image(IMAGE_PAYLOAD[0], IMAGE_PAYLOAD[1])
        .image(IMAGE_PAYLOAD[0], IMAGE_PAYLOAD[1])
        .image(IMAGE_PAYLOAD[0], IMAGE_PAYLOAD[1])
        .image(IMAGE_PAYLOAD[0], IMAGE_PAYLOAD[1])
        .image(IMAGE_PAYLOAD[0], IMAGE_PAYLOAD[1])
        .create()
}

const sendAckMesage = async () => {
    console.log('Send ack message...')
    return await JustPushMessage.token(ACCESS_TOKEN)
        .topic('TestTopic')
        .title('Test Title')
        .message('Here is a message with ack')
        .acknowledge(true, 'https://www.google.ro')
        .create()
}

const sendButtonsMesage = async () => {
    console.log('Send button message...')
    return await JustPushMessage.token(ACCESS_TOKEN)
        .topic('TestTopic')
        .title('Test Title')
        .message('Here is a message with ack')
        .acknowledge(true, 'https://www.google.ro')
        .button('Button 1', 'https://google.com', true)
        .create()
}

const getMessage = async (messageKey: string) => {
    console.log('Get message...', messageKey)
    return await JustPushMessage.token(ACCESS_TOKEN).key(messageKey).get()
}

const test = async () => {
    try {
        await sendSimpleTextMesage()
        await sendImageMesage()
        await sendAckMesage()
        const lastMessage = await sendButtonsMesage()

        // Wait for 5 seconds
        await new Promise((resolve) => setTimeout(resolve, 10000))

        // Retrieve the message
        await getMessage(lastMessage.key)
    } catch (error) {
        console.error('Error:', error)
    }
}

test()
