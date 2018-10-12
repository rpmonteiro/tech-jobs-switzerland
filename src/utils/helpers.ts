export const isEmpty = (obj: Object | any[] | undefined | null): boolean => {
  if (!obj) {
    return true
  }

  if (Array.isArray(obj)) {
    return obj.length === 0
  }

  return Object.keys(obj).length === 0
}
