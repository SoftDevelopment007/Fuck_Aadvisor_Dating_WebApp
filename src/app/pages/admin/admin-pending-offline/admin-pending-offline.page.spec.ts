import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdminPendingOfflinePage } from './admin-pending-offline.page';

describe('AdminPendingOfflinePage', () => {
  let component: AdminPendingOfflinePage;
  let fixture: ComponentFixture<AdminPendingOfflinePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPendingOfflinePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminPendingOfflinePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
