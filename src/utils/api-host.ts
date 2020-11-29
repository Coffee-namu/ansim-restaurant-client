export const apiHost = (path: string) =>
  process.env.NODE_ENV === 'development'
    ? `http://localhost:3000${path}`
    : `https://ansim.payw.org${path}`
