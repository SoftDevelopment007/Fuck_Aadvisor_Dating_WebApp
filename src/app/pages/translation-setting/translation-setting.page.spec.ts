import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TranslationSettingPage } from './translation-setting.page';

describe('TranslationSettingPage', () => {
  let component: TranslationSettingPage;
  let fixture: ComponentFixture<TranslationSettingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranslationSettingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TranslationSettingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
