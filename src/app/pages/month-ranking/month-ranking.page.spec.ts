import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MonthRankingPage } from './month-ranking.page';

describe('MonthRankingPage', () => {
  let component: MonthRankingPage;
  let fixture: ComponentFixture<MonthRankingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthRankingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MonthRankingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
