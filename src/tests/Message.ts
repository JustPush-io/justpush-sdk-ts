import { JustPushMessage } from "../services/JustPushMessage";
import { ACCESS_TOKEN } from "./TestConstants.js";

const IMAGE_PAYLOAD: string[] = [
  "https://i2.wp.com/www.learnsteps.com/wp-content/uploads/2017/04/what-is-a-hyperlink-with-pictures-UDZ66a-clipart.jpg?fit=1000%2C740&ssl=1",
  "Test caption",
];

const sendSimpleTextMesage = async () => {
  console.log("Send simple text message...");
  return await JustPushMessage.token(ACCESS_TOKEN)
    .topic("TestTopic")
    .title("Test Title")
    .message("Here is a sample Message")
    .create();
};

const sendImageMesage = async () => {
  console.log("Send image message...");
  return await JustPushMessage.token(ACCESS_TOKEN)
    .topic("TestTopic")
    .title("Test Title")
    .message("Here is a massage with images")
    .image(IMAGE_PAYLOAD[0], IMAGE_PAYLOAD[1])
    .image(IMAGE_PAYLOAD[0], IMAGE_PAYLOAD[1])
    .image(IMAGE_PAYLOAD[0], IMAGE_PAYLOAD[1])
    .image(IMAGE_PAYLOAD[0], IMAGE_PAYLOAD[1])
    .image(IMAGE_PAYLOAD[0], IMAGE_PAYLOAD[1])
    .create();
};

const sendAckMessage = async () => {
  console.log("Send ack message...");
  return await JustPushMessage.token(ACCESS_TOKEN)
    .topic("TestTopic")
    .title("Test Title")
    .message("Here is a message with ack")
    .acknowledge({
      requiresAcknowledgement: true,
      callbackUrl: "https://webhook.site/6c19f1ed-230c-4aa7-8679-5ea4e5eec345",
      callbackParams: {
        test: "test",
      },
      requiresRetry: true,
      retryInterval: 60,
      maxRetries: 10,
    })
    .create();
};

const sendButtonsMessage = async () => {
  console.log("Send button message...");
  return await JustPushMessage.token(ACCESS_TOKEN)
    .topic("TestTopic")
    .title("Test Title")
    .message("Here is a message with ack")
    .acknowledge({
      requiresAcknowledgement: true,
      callbackUrl: "https://webhook.site/6c19f1ed-230c-4aa7-8679-5ea4e5eec345",
      callbackParams: {
        test: "test",
      },
      requiresRetry: true,
      retryInterval: 60,
      maxRetries: 10,
    })
    .button({
      cta: "Button 1",
      url: "https://google.com",
      action_required: true,
    })
    .create();
};

const getMessage = async (messageKey: string) => {
  console.log("Get message...", messageKey);
  return await JustPushMessage.token(ACCESS_TOKEN).key(messageKey).get();
};

const sendButtonGroupsMessage = async () => {
  console.log("Send button groups message...");
  return await JustPushMessage.token(ACCESS_TOKEN)
    .topic("TestTopic")
    .title("Test Title")
    .message("Here is a message with button groups")
    .buttonGroups([
      {
        name: "Group 1",
        cta: "Group 1 Cta",
        action_required: true,
        buttons: [
          {
            cta: "Button 1",
            url: "https://google.com",
            action_required: true,
          },
          {
            cta: "Button 2",
            url: "https://google.com",
            action_required: true,
          },
          {
            cta: "Button 3",
            url: "https://google.com",
            action_required: true,
          },
        ],
      },
      {
        name: "Group 2",
        cta: "Group 2 Cta",
        action_required: true,
        buttons: [
          {
            cta: "Button 1",
            url: "https://google.com",
            action_required: true,
          },
          {
            cta: "Button 2",
            url: "https://google.com",
            action_required: true,
          },
          {
            cta: "Button 3",
            url: "https://google.com",
            action_required: true,
          },
        ],
      },
    ])
    .create();
};

const test = async () => {
  try {
    await sendSimpleTextMesage();
    await sendImageMesage();
    await sendAckMessage();
    await sendButtonGroupsMessage();
    const lastMessage = await sendButtonsMessage();

    // // Wait for 5 seconds
    await new Promise((resolve) => setTimeout(resolve, 10000));

    // // Retrieve the message
    await getMessage(lastMessage.key);
  } catch (error) {
    console.error("Error:", error);
  }
};

test();
