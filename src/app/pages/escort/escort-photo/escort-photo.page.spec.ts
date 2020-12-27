import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EscortPhotoPage } from './escort-photo.page';

describe('EscortPhotoPage', () => {
  let component: EscortPhotoPage;
  let fixture: ComponentFixture<EscortPhotoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscortPhotoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EscortPhotoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
