export interface IUser {
  _id?: string
  name: string
  email: string
  password: string
  createdAt: Date
}

export type PublicUser = Omit<IUser, 'password'>
export type UserSummery = Pick<IUser, 'name' | 'email'>
