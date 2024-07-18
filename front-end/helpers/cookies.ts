function getCookie(name: string): string | undefined {

  return document.cookie
    .split(';')
    .find(cookie => cookie.trim().toLowerCase().startsWith(name.toLowerCase() + '='))
    ?.split('=')[1]
}

type CookieOptions = {
  name: string,
  value: string,
  expiresInDays: number,
  isSecure: boolean
}

function setCookie({ name, value, expiresInDays, isSecure = true }: CookieOptions) {
  const expirationDate = new Date(Date.now() + expiresInDays * 24 * 60 * 60 * 1000)
  document.cookie = `${name}=${value}; Expires=${expirationDate.toUTCString()}; Path=/${isSecure ? '; Secure' : ''}`
}

function removeCookie(name: string) {
  document.cookie = `${name}=; Expires=Thu, 01 Jan 1970 00:00:00 UTC; Path=/`
}

export {
  getCookie,
  setCookie,
  CookieOptions,
  removeCookie
}
