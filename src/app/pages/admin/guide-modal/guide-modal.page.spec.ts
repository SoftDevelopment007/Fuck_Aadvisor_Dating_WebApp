import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GuideModalPage } from './guide-modal.page';

describe('GuideModalPage', () => {
  let component: GuideModalPage;
  let fixture: ComponentFixture<GuideModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuideModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GuideModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
