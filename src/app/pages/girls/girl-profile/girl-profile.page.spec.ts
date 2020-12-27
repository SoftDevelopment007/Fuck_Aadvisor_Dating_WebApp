import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GirlProfilePage } from './girl-profile.page';

describe('GirlProfilePage', () => {
  let component: GirlProfilePage;
  let fixture: ComponentFixture<GirlProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GirlProfilePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GirlProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
