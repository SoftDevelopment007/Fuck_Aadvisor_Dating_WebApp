import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SecurityWarningModalPage } from './security-warning-modal.page';

describe('SecurityWarningModalPage', () => {
  let component: SecurityWarningModalPage;
  let fixture: ComponentFixture<SecurityWarningModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecurityWarningModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SecurityWarningModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
