import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EscortGoldPage } from './escort-gold.page';

describe('EscortGoldPage', () => {
  let component: EscortGoldPage;
  let fixture: ComponentFixture<EscortGoldPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscortGoldPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EscortGoldPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
