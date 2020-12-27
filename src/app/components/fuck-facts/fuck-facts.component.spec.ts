import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FuckFactsComponent } from './fuck-facts.component';

describe('FuckFactsComponent', () => {
  let component: FuckFactsComponent;
  let fixture: ComponentFixture<FuckFactsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FuckFactsComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FuckFactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
