import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EscortUpgradePage } from './escort-upgrade.page';

describe('EscortUpgradePage', () => {
  let component: EscortUpgradePage;
  let fixture: ComponentFixture<EscortUpgradePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscortUpgradePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EscortUpgradePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
