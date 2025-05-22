<p align="center"><img src="https://cdn.justpush.io/core/app%20icon_nobackground.svg" width="150" height="auto"></p>

## JustPush - TypeScript SDK

Welcome to the official TypeScript SDK for JustPush! This SDK allows you to easily integrate with our powerful messaging platform, providing functionalities to create messages, retrieve messages, create topics, and update topics.

## Features

- **Create Messages**: Send messages effortlessly using our streamlined API.
- **Retrieve Messages**: Fetch messages with ease for seamless integration and processing.
- **Create Topics**: Organize your messages by creating specific topics.
- **Update Topics**: Modify existing topics to keep your message structure flexible and up-to-date.

## Download the App in the App Stores

## Installation

Install the SDK via npm:

```bash
npm i @justpush.io/justpush-ts-sdk

```

## Basic Push Message

This is a basic example of sending a notification.

```js
const response = await JustPushMessage.token("REPLACE_WITH_USER_TOKEN")
  .message("Here is a sample Message")
  .title("Test Title")
  .create();
```

# JustPush Message

| Function Name     | Available Attributes                                                                                                                                                                  | Description                                                              |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| `token`           | `(token: string)`                                                                                                                                                                     | Set the user token / API token                                           |
| `message`         | `(message: string)`                                                                                                                                                                   | The textual body of the message                                          |
| `title`           | `(title: string)`                                                                                                                                                                     | The title of the message                                                 |
| `topic`           | `(topic: string)`                                                                                                                                                                     | Either the UUID or the name of the topic you want to send the message to |
| `image`           | `(url: string, caption: string)`                                                                                                                                                      | Adds an image the to the message                                         |
| `images`          | `(images: Array<{url: string, caption: string}>)`                                                                                                                                     | Adds multiple images                                                     |
| `button`          | `(cta: string, url: string, requires_action: boolean)`                                                                                                                                | Adds a button to the message                                             |
| `buttons`         | `(buttons: Array<button>)`                                                                                                                                                            | Adds multiple buttons to the message                                     |
| `buttonGroups`    | `(groups: Array<{name: string, cta: string, action_required: boolean, buttons: Array<{cta: string, url: string, requires_action: boolean}>}>)`                                        | Adds groups of buttons to the message, each with its own name and CTA    |
| `sound`           | `(sound: string)`                                                                                                                                                                     | Define the sound of the message                                          |
| `priority`        | `(priority: 2 \| 1 \| 0 \| -1 \| -2)`                                                                                                                                                 | Manually set the priority                                                |
| `highestPriority` | `()`                                                                                                                                                                                  | Set the message priority on `2`                                          |
| `highPriority`    | `()`                                                                                                                                                                                  | Set the message priority on `1`                                          |
| `normalPriority`  | `()`                                                                                                                                                                                  | Set the message priority on `0`                                          |
| `lowPriority`     | `()`                                                                                                                                                                                  | Set the message priority on `-1`                                         |
| `lowestPriority`  | `()`                                                                                                                                                                                  | Set the message priority on `-2`                                         |
| `expiry`          | `(expiry: number)`                                                                                                                                                                    | Set the expiry in Seconds                                                |
| `acknowledge`     | `(requiresAcknowledgement: boolean, requiresRetry?: boolean, retryInterval?: number, maxRetries?: number, callbackRequired?: boolean, callbackUrl?: string, callbackParams?: object)` | Adds an acknowledgement to the messages                                  |

### Defining the topic

Our goals it to keep the API as simple as possible. Therefore, you can send either:

- **Topic Title** - When the title exists more than once, the oldest topic will be used. If the name is not in your topic list, a new topic will be created.
- **Topic UUID** - Uses the exact match of the topic

### Sending multiple images

When a message contains multiple images, the first image will be used for the push message banner.

### Using Button Groups

You can organize buttons into groups, each with its own name and call-to-action. Here's an example:

```js
const response = await JustPushMessage.token("REPLACE_WITH_USER_TOKEN")
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
          requires_action: true,
        },
        {
          cta: "Button 2",
          url: "https://google.com",
          requires_action: true,
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
          requires_action: true,
        },
        {
          cta: "Button 2",
          url: "https://google.com",
          requires_action: true,
        },
      ],
    },
  ])
  .create();
```

#### Button Group Object Fields

Each button group object has the following fields:

| Field             | Type    | Required | Description                                         |
| ----------------- | ------- | -------- | --------------------------------------------------- |
| `name`            | string  | Yes      | The name/title of the button group                  |
| `cta`             | string  | Yes      | The call-to-action text for the group               |
| `requires_action` | boolean | Yes      | Whether user interaction is required for this group |
| `buttons`         | array   | Yes      | Array of button objects within the group            |

Each button in the `buttons` array has these fields:

| Field             | Type    | Required | Description                                          |
| ----------------- | ------- | -------- | ---------------------------------------------------- |
| `cta`             | string  | Yes      | The text displayed on the button                     |
| `url`             | string  | Yes      | The URL the button links to                          |
| `requires_action` | boolean | Yes      | Whether user interaction is required for this button |

### Setting an Expiry

When a expiry is set, the message will have an TTL in seconds. After the expiry, in seconds, has expired, the message will automatically be hidden.

# JustPush Topics

| Function Name | Available Attributes            |
| ------------- | ------------------------------- |
| `__construct` | `$token`                        |
| `token`       | `string $token`                 |
| `title`       | `?string $title`                |
| `topic`       | `?string $topicUuid`            |
| `avatar`      | `?string $url`, `?string $body` |

## POST / Create A Topic

This is a basic example of creating a topic

```js
const response = await JustPushTopic.token("REPLACE_WITH_USER_TOKEN")
  .title("New Topic")
  .create();
```

## PUT / Update A Topic

This is a basic example of updating a topic

```js
$response = JustPushTopic.token("REPLACE_WITH_USER_TOKEN")
  .topic("REPLACE_WITH_TOPIC_UUID")
  .title("New Topic Title")
  .update();
```

## GET / Get a topic

This is a basic example of creating a topic

```js
const response = await JustPushTopic.token("REPLACE_WITH_USER_TOKEN")
  .topic("REPLACE_WITH_TOPIC_UUID")
  .get();
```

## OpenApi Spec

The package comes with an OpenAPI spec. Which can be found in the `docs` folder. [Click Here](https://github.com/JustPush-io/justpush-sdk-js/tree/docs)

## Changelog

- `n/a` - No changes yet.
