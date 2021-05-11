import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailsComponentComponent } from './user-details-component.component';

describe('UserDetailsComponentComponent', () => {
  let component: UserDetailsComponentComponent;
  let fixture: ComponentFixture<UserDetailsComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDetailsComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
