import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SemRankingPage } from './sem-ranking.page';

describe('SemRankingPage', () => {
  let component: SemRankingPage;
  let fixture: ComponentFixture<SemRankingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SemRankingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SemRankingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
