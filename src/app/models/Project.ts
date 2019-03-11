import { Skill } from './Skill';

export interface Project {
  id: number,
  demand_user_id: number,
  dev_user_id: number,
  avatar?: string,
  title: string,
  desc: string,
  skills: Skill[],
  create_time: string,
  deadline: string,
  price: number,
  status: Status,
}


/**
 * @description 项目状态
 * 0：已发布，未接受
 * 1：已发布，已接受，开发中未交付
 * 3：已发布，已接受，已开发已交付，验收中未结款
 * 4：已发布，已接受，已开发已交付，已验收已结款
 *  */
export enum Status {
  '新发布项目' = 0,
  '项目开发中' = 1,
  '项目验收中' = 3,
  '项目已结款' = 4
}