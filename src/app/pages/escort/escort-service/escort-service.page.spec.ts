import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EscortServicePage } from './escort-service.page';

describe('EscortServicePage', () => {
  let component: EscortServicePage;
  let fixture: ComponentFixture<EscortServicePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscortServicePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EscortServicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
