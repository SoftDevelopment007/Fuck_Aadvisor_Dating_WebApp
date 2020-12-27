import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdminPendingOnlinePage } from './admin-pending-online.page';

describe('AdminPendingOnlinePage', () => {
  let component: AdminPendingOnlinePage;
  let fixture: ComponentFixture<AdminPendingOnlinePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPendingOnlinePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminPendingOnlinePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
