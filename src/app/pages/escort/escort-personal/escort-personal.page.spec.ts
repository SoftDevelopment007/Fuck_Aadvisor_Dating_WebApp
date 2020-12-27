import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EscortPersonalPage } from './escort-personal.page';

describe('EscortPersonalPage', () => {
  let component: EscortPersonalPage;
  let fixture: ComponentFixture<EscortPersonalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscortPersonalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EscortPersonalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
