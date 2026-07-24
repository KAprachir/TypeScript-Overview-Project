declare module 'bcryptjs' {
  export function hash(password: string, salt: number | string): Promise<string>
  export function genSalt(rounds?: number): Promise<string>
  export function genSaltSync(rounds?: number): string
  export function compare(password: string, hash: string): Promise<boolean>
  export function compareSync(password: string, hash: string): boolean
  export function setRandomFallback(random: (random: number) => number[]): void

  const bcrypt: {
    hash: typeof hash
    genSalt: typeof genSalt
    genSaltSync: typeof genSaltSync
    compare: typeof compare
    compareSync: typeof compareSync
    setRandomFallback: typeof setRandomFallback
  }

  export default bcrypt
}