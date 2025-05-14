export const capitalizeFirstLetter = (value: string) =>
  value.charAt(0).toUpperCase() + value.slice(1)

export const decodeJWTBody = (accessToken: string) =>
  JSON.parse(atob(accessToken.split('.')[1]))
