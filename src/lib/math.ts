export function sumArray(arr: number[]): number {
  return arr.reduce((acc, curr) => acc + curr, 0);
}
