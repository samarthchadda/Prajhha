import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAppointFacultyComponent } from './new-appoint-faculty.component';

describe('NewAppointFacultyComponent', () => {
  let component: NewAppointFacultyComponent;
  let fixture: ComponentFixture<NewAppointFacultyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewAppointFacultyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAppointFacultyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
