import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAppointFacultyComponent } from './edit-appoint-faculty.component';

describe('EditAppointFacultyComponent', () => {
  let component: EditAppointFacultyComponent;
  let fixture: ComponentFixture<EditAppointFacultyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAppointFacultyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAppointFacultyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
