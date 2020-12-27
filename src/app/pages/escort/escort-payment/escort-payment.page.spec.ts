import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EscortPaymentPage } from './escort-payment.page';

describe('EscortPaymentPage', () => {
  let component: EscortPaymentPage;
  let fixture: ComponentFixture<EscortPaymentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscortPaymentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EscortPaymentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
