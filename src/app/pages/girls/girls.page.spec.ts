import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GirlsPage } from './girls.page';

describe('GirlsPage', () => {
  let component: GirlsPage;
  let fixture: ComponentFixture<GirlsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GirlsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GirlsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
