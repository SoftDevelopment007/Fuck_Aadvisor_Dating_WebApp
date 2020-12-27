import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdminEscortsPage } from './admin-escorts.page';

describe('AdminEscortsPage', () => {
  let component: AdminEscortsPage;
  let fixture: ComponentFixture<AdminEscortsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEscortsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminEscortsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
