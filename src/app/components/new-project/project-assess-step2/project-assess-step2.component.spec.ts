import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectAssessStep2Component } from './project-assess-step2.component';

describe('ProjectAssessStep2Component', () => {
  let component: ProjectAssessStep2Component;
  let fixture: ComponentFixture<ProjectAssessStep2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectAssessStep2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectAssessStep2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
