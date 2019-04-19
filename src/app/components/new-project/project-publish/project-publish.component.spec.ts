import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectPublishComponent } from './project-publish.component';

describe('ProjectPublishComponent', () => {
  let component: ProjectPublishComponent;
  let fixture: ComponentFixture<ProjectPublishComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectPublishComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectPublishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
