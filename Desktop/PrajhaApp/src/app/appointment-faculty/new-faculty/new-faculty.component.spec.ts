import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFacultyComponent } from './new-faculty.component';

describe('NewFacultyComponent', () => {
  let component: NewFacultyComponent;
  let fixture: ComponentFixture<NewFacultyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewFacultyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewFacultyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
