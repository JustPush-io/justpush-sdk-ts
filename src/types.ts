interface Button {
    cta: string
    url: string
    is_triggered: boolean
    action_required: boolean
    triggered_at: string | null
}

interface Acknowledgement {
    is_acknowledged: boolean
    acknowledged_at?: string
    acknowledged_device?: {
        name: string
    }
}

interface Image {
    thumb: string
    medium: string
    large: string
}

export interface Message {
    user_uuid: string
    topic: Topic
    key: string
    title: string
    message: string
    priority: number
    sound: string
    requires_acknowledgement: boolean
    acknowledgement?: Acknowledgement | null
    buttons?: Button[] | null
    images?: Image[] | null
    pending_actions: number
    received_at: string
    processed_at: string
    expires_at: string | null
    removed_at: string | null
    created_at: string
    updated_at: string
}

export interface MessageCreatedResponse {
    status: string
    key: string
}

export interface Topic {
    uuid: string
    title: string
    slug: string
    avatar: string
    has_custom_avatar: boolean
    api_token: string
    last_message?: Partial<Message> | null
}
