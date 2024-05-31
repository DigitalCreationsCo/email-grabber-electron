export function createCSVFile(data: string[]) {
  let csvContent = data.join(', ')

  let blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  let url = URL.createObjectURL(blob)
  return url
}
