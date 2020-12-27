import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EscortBecomePage } from './escort-become.page';

describe('EscortBecomePage', () => {
  let component: EscortBecomePage;
  let fixture: ComponentFixture<EscortBecomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscortBecomePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EscortBecomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
