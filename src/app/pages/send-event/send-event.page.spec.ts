import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SendEventPage } from './send-event.page';

describe('SendEventPage', () => {
  let component: SendEventPage;
  let fixture: ComponentFixture<SendEventPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendEventPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SendEventPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
