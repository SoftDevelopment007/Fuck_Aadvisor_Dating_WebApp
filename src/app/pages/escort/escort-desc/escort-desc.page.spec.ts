import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EscortDescPage } from './escort-desc.page';

describe('EscortDescPage', () => {
  let component: EscortDescPage;
  let fixture: ComponentFixture<EscortDescPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscortDescPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EscortDescPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
