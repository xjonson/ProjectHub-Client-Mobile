import { Skill } from './Skill';

export interface User {
  id: number,
  email: string,
  password: string,
  role: Role,
  profile: profile,
  skill: Skill[],
  msg?:[]
}

// 用户身份
export enum Role {
  admin = 1,
  demander = 2,
  dev = 3
}

// 用户个人信息
export interface profile {
  name: string,
  phone: string,
  avatar?: string,
  desc?: string
}