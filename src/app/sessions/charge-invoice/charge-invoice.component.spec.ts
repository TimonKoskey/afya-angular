import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargeInvoiceComponent } from './charge-invoice.component';

describe('ChargeInvoiceComponent', () => {
  let component: ChargeInvoiceComponent;
  let fixture: ComponentFixture<ChargeInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChargeInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChargeInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
