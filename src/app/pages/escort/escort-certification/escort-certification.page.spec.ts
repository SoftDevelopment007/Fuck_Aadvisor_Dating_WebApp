import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EscortCertificationPage } from './escort-certification.page';

describe('EscortCertificationPage', () => {
  let component: EscortCertificationPage;
  let fixture: ComponentFixture<EscortCertificationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscortCertificationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EscortCertificationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
