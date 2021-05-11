import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionNotesContainerComponent } from './session-notes-container.component';

describe('SessionNotesContainerComponent', () => {
  let component: SessionNotesContainerComponent;
  let fixture: ComponentFixture<SessionNotesContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessionNotesContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionNotesContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
