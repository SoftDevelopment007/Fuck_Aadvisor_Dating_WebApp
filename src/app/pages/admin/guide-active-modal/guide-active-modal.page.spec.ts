import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GuideActiveModalPage } from './guide-active-modal.page';

describe('GuideActiveModalPage', () => {
  let component: GuideActiveModalPage;
  let fixture: ComponentFixture<GuideActiveModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuideActiveModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GuideActiveModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
