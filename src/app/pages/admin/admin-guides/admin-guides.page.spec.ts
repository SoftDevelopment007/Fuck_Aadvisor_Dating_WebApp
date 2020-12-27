import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdminGuidesPage } from './admin-guides.page';

describe('AdminGuidesPage', () => {
  let component: AdminGuidesPage;
  let fixture: ComponentFixture<AdminGuidesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminGuidesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminGuidesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
