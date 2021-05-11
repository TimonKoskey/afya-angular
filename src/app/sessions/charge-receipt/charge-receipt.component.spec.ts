import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargeReceiptComponent } from './charge-receipt.component';

describe('ChargeReceiptComponent', () => {
  let component: ChargeReceiptComponent;
  let fixture: ComponentFixture<ChargeReceiptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChargeReceiptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChargeReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
