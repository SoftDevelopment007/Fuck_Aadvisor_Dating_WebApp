import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FilterListModalPage } from './filter-list-modal.page';

describe('FilterListModalPage', () => {
  let component: FilterListModalPage;
  let fixture: ComponentFixture<FilterListModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterListModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FilterListModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
