import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailSocialsPage } from './detail-socials.page';

describe('DetailSocialsPage', () => {
  let component: DetailSocialsPage;
  let fixture: ComponentFixture<DetailSocialsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailSocialsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailSocialsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
