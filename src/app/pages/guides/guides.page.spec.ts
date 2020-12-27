import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GuidesPage } from './guides.page';

describe('GuidesPage', () => {
  let component: GuidesPage;
  let fixture: ComponentFixture<GuidesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuidesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GuidesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
