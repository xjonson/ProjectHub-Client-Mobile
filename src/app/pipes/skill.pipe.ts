import { Pipe, PipeTransform } from '@angular/core';
import { SkillService } from '../service/skill.service';
import { ResTpl } from '../models/ResTpl';

@Pipe({ name: 'skill' })
export class SkillPipe implements PipeTransform {
  constructor(
    private skillService: SkillService
  ) {
    this.skillService.getSkills().subscribe()
  }

  transform(value: number): any {
    if (this.skillService.skills && this.skillService.skills.length) {
      return this.skillService.skills.filter(item => +item.id == value)[0].name
    } else {
      return
    }
  }
}