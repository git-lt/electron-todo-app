export type MessageTheme = 'success' | 'error' | 'warning' | 'info'
export interface MessageOptions {
  visible: boolean
  x: number
  y: number
  zIndex: number
  content: string
  theme: MessageTheme
  distance: number
}
