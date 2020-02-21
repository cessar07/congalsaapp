import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SendRecipePage } from './send-recipe.page';

describe('SendRecipePage', () => {
  let component: SendRecipePage;
  let fixture: ComponentFixture<SendRecipePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendRecipePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SendRecipePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
