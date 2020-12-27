import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomepageBannerModalPage } from './homepage-banner-modal.page';

describe('HomepageBannerModalPage', () => {
  let component: HomepageBannerModalPage;
  let fixture: ComponentFixture<HomepageBannerModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomepageBannerModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomepageBannerModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
