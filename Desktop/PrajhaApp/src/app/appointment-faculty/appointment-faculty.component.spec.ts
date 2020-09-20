import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentFacultyComponent } from './appointment-faculty.component';

describe('AppointmentFacultyComponent', () => {
  let component: AppointmentFacultyComponent;
  let fixture: ComponentFixture<AppointmentFacultyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppointmentFacultyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentFacultyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
