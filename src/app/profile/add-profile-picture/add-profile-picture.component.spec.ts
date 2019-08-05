import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProfilePictureComponent } from './add-profile-picture.component';

describe('AddProfilePictureComponent', () => {
  let component: AddProfilePictureComponent;
  let fixture: ComponentFixture<AddProfilePictureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProfilePictureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProfilePictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
