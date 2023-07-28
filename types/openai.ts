export enum GptRole {
  USER = 'user',
  ASSISTANT = 'assistant',
  SYSTEM = 'system',
}
export interface GptMessage {
  role: GptRole
  content: string
}
export interface GptMessageClient extends GptMessage {
  date: Date
}

export type PromptItem = [ string, string]
export interface PromptListResponse {
  cn: PromptItem[]
  en: PromptItem[]
}

export interface ChatInfo {
  messages: GptMessageClient[]
  model?: string
  frequency_penalty?: number
  presence_penalty?: number
  temperature?: number
  top_p?: number
}
export interface RoleMessage {
  role: GptRole.SYSTEM
  content: string
}
