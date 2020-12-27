import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EscortUpgradePopoverComponent } from './escort-upgrade-popover.component';

describe('EscortUpgradePopoverComponent', () => {
  let component: EscortUpgradePopoverComponent;
  let fixture: ComponentFixture<EscortUpgradePopoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscortUpgradePopoverComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EscortUpgradePopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
