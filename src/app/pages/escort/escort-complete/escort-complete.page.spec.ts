import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EscortCompletePage } from './escort-complete.page';

describe('EscortCompletePage', () => {
  let component: EscortCompletePage;
  let fixture: ComponentFixture<EscortCompletePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscortCompletePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EscortCompletePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
