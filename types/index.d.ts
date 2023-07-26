export {}

declare module 'vue3-markdown-it'

declare global {
  // Import the types definitions
  interface Window {
    JSEditTaskDialog: HTMLDialogElement,
    api: {
      trpc: (req: IpcRequest) => Promise<IpcResponse>
      serialport: {
        list: () => Promise<SerialPort.PortInfo[]>
      }
    }
  }
}
