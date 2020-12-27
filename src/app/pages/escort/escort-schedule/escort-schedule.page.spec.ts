import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EscortSchedulePage } from './escort-schedule.page';

describe('EscortSchedulePage', () => {
  let component: EscortSchedulePage;
  let fixture: ComponentFixture<EscortSchedulePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscortSchedulePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EscortSchedulePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
