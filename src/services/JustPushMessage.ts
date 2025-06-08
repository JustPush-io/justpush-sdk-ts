import { Message, MessageCreatedResponse } from "../types";
import JustPushBase from "../utils/JustPushBase";

interface Button {
  cta: string;
  url: string;
  action_required: boolean;
}

interface ButtonFromGroup {
  cta: string;
  url: string;
  requires_action: boolean;
}

interface ButtonGroup {
  name: string;
  cta: string;
  action_required: boolean;
  buttons: ButtonFromGroup[];
}

export class JustPushMessage extends JustPushBase {
  static ENDPOINT = "/messages";

  private messageParams: { [key: string]: any } = {};

  private constructor(token: string) {
    super();
    this.setToken(token);
  }

  static token(token = ""): JustPushMessage {
    return new JustPushMessage(token);
  }

  key(messageKey = ""): this {
    this.messageParams["key"] = messageKey;
    return this;
  }

  message(message = ""): this {
    this.messageParams["message"] = message;
    return this;
  }

  title(title: string): this {
    this.messageParams["title"] = title;
    return this;
  }

  topic(topic: string): this {
    this.messageParams["topic"] = topic;
    return this;
  }

  user(user: string): this {
    this.messageParams["user"] = user;
    return this;
  }

  image(url: string, caption: string | null = null): this {
    if (!this.messageParams["images"]) {
      this.messageParams["images"] = [];
    }
    this.messageParams["images"].push({ url, caption });
    return this;
  }

  images(images: { url: string; caption?: string }[]): this {
    images.forEach((image) => this.image(image.url, image.caption || null));
    return this;
  }

  button(cta: string, url: string, action_required = false): this {
    if (!this.messageParams["buttons"]) {
      this.messageParams["buttons"] = [];
    }
    this.messageParams["buttons"].push({ cta, url, action_required });
    return this;
  }

  buttons(buttons: Button[]): this {
    buttons.forEach((button) =>
      this.button(button.cta, button.url, button.action_required)
    );
    return this;
  }

  buttonGroups(buttonGroups: ButtonGroup[]): this {
    if (!this.messageParams["button_groups"]) {
      this.messageParams["button_groups"] = [];
    }
    this.messageParams["button_groups"].push(...buttonGroups);
    return this;
  }

  sound(sound: string): this {
    this.messageParams["sounds"] = sound;
    return this;
  }

  priority(priority: number): this {
    this.messageParams["priority"] = priority;
    return this;
  }

  highestPriority(): this {
    return this.priority(2);
  }

  highPriority(): this {
    return this.priority(1);
  }

  normalPriority(): this {
    return this.priority(0);
  }

  lowPriority(): this {
    return this.priority(-1);
  }

  lowestPriority(): this {
    return this.priority(-2);
  }

  expiry(expiry: number): this {
    this.messageParams["expiry_ttl"] = expiry;
    return this;
  }

  acknowledge(
    requiresAcknowledgement: boolean,
    callbackUrl: string | null = null,
    callbackParams: Record<string, any> | null = null,
    requiresRetry: boolean = true,
    retryInterval: number = 60,
    maxRetries: number = 10
  ): this {
    let retryIntervalPayload = {};
    if (requiresRetry) {
      retryIntervalPayload = {
        requires_retry: requiresRetry,
        retry_interval: retryInterval,
        max_retries: maxRetries,
      };
    }
    this.messageParams = {
      ...this.messageParams,
      requires_acknowledgement: requiresAcknowledgement,
      acknowledgement: {
        callback: {
          url: callbackUrl,
          params: JSON.stringify(callbackParams),
        },
        ...retryIntervalPayload,
      },
    };
    return this;
  }

  async create(): Promise<MessageCreatedResponse> {
    return await this.request(JustPushMessage.ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.messageParams),
    });
  }

  async get(): Promise<Message> {
    if (!this.messageParams["key"]) {
      throw new Error("Message key must be set before calling get.");
    }
    return await this.request(
      `${JustPushMessage.ENDPOINT}/${this.messageParams["key"]}`,
      {
        method: "GET",
      }
    );
  }

  getMessageParams(): { [key: string]: any } {
    return this.messageParams;
  }
}

export type { Button, ButtonGroup };
