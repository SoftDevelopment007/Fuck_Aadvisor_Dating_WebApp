import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EscortPendingInfoModalPage } from './escort-pending-info-modal.page';

describe('EscortPendingInfoModalPage', () => {
  let component: EscortPendingInfoModalPage;
  let fixture: ComponentFixture<EscortPendingInfoModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscortPendingInfoModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EscortPendingInfoModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
