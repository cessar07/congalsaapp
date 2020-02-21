import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailNewPage } from './detail-new.page';

describe('DetailNewPage', () => {
  let component: DetailNewPage;
  let fixture: ComponentFixture<DetailNewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailNewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailNewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
