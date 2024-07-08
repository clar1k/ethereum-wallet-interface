export function chunkArray(array: any[], size: number) {
  const result = [];

  for (let index = 0; index < array.length; index += size) {
    const chunk = array.slice(index, index + size);
    result.push(chunk);
  }
  return result;
}
