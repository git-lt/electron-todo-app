export enum GptRole {
  USER = 'user',
  ASSISTANT = 'assistant',
}
export interface GptMessage {
  role: GptRole
  content: string
}
export interface GptMessageClient extends GptMessage {
  date: Date
}
