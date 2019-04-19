import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectAssessStep1Component } from './project-assess-step1.component';

describe('ProjectAssessStep1Component', () => {
  let component: ProjectAssessStep1Component;
  let fixture: ComponentFixture<ProjectAssessStep1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectAssessStep1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectAssessStep1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
