import { Pipe, PipeTransform } from '@angular/core';
import { SkillService } from '../service/skill.service';
import { ResTpl } from '../models/ResTpl';

@Pipe({ name: 'skill' })
export class SkillPipe implements PipeTransform {
  Skill: [{
    id: string,
    name: string
  }]
  constructor(
    private skillService: SkillService
  ) {
    this.skillService.getSkills().subscribe((res: ResTpl) => {
      this.Skill = res.data
    })
  }
  transform(value: number): any {
    return this.Skill.filter(item => +item.id == value)[0].name
  }
}