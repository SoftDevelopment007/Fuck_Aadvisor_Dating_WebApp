import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdminCountryPage } from './admin-country.page';

describe('AdminCountryPage', () => {
  let component: AdminCountryPage;
  let fixture: ComponentFixture<AdminCountryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCountryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminCountryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
