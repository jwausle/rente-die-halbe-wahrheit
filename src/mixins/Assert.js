export function requireDefined (ref, message) {
  if (name === undefined) {
    throw new Error(message)
  }
  return ref
}

export default {
  requireDefined (ref, message) {
    if (ref === undefined) {
      throw new Error(message)
    }
    return ref
  },
  requireDate (date, message) {
    if (!(date instanceof Date)) {
      throw new Error(message)
    }
    return date
  }
}
