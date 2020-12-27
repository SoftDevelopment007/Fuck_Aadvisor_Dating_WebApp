import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EscortUsageModalPage } from './escort-usage-modal.page';

describe('EscortUsageModalPage', () => {
  let component: EscortUsageModalPage;
  let fixture: ComponentFixture<EscortUsageModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscortUsageModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EscortUsageModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
