export default function execAll(...arr: (() => void)[]) {
  arr.forEach((fn) => fn());
}

export function execAllWait(...arr: (() => void)[]) {
  return () => arr.forEach((fn) => fn());
}
