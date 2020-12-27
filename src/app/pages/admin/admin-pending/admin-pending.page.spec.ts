import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdminPendingPage } from './admin-pending.page';

describe('AdminPendingPage', () => {
  let component: AdminPendingPage;
  let fixture: ComponentFixture<AdminPendingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPendingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminPendingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
