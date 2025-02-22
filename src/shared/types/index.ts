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
  callback(
    event: IpcMainInvokeEvent,
    args: {
      channel: string
      hrefs?: string[]
      emails?: string[]
      message?: 'DONE'
    }
  ): void
}

export type GetHrefsArgs = [string, number?, string[]?]
