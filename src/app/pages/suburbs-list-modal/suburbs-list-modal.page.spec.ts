import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SuburbsListModalPage } from './suburbs-list-modal.page';

describe('SuburbsListModalPage', () => {
  let component: SuburbsListModalPage;
  let fixture: ComponentFixture<SuburbsListModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuburbsListModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SuburbsListModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
