import {
  BrowserWindow,
  IpcMainInvokeEvent,
  BrowserWindowConstructorOptions,
} from 'electron'

export type BrowserWindowOrNull = Electron.BrowserWindow | null

export interface WindowProps extends BrowserWindowConstructorOptions {
  id: string
}

export interface WindowCreationByIPC {
  channel: string
  window(): BrowserWindowOrNull
  callback(window: BrowserWindow, event: IpcMainInvokeEvent): void
}

export interface ScrapeEventByIPC {
  channel: string
  callback(event: IpcMainInvokeEvent, args?: any): void
  // window(): Promise<BrowserWindowOrNull>
}
