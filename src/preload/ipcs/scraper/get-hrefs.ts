import { ipcRenderer } from 'electron'
import { IPC } from 'shared/constants'

export async function getHrefs(...args: any[]): Promise<string[]> {
  const channel = IPC.WINDOWS.SCRAPER.GET_HREFS

  const result = await ipcRenderer.invoke(channel, ...args)
  // console.info('result', result)
  return result
}
