import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EscortImagesModalPage } from './escort-images-modal.page';

describe('EscortImagesModalPage', () => {
  let component: EscortImagesModalPage;
  let fixture: ComponentFixture<EscortImagesModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscortImagesModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EscortImagesModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
