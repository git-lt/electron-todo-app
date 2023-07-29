import dayjs from 'dayjs'
export function delay(time: number) {
  return new Promise(resolve => setTimeout(resolve, time))
}

export function formatDateTime(date: Date): string {
  return dayjs(date).format('YYYY.MM.DD HH:mm:ss')
}
