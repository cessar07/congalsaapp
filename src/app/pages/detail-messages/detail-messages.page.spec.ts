import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailMessagesPage } from './detail-messages.page';

describe('DetailMessagesPage', () => {
  let component: DetailMessagesPage;
  let fixture: ComponentFixture<DetailMessagesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailMessagesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailMessagesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
