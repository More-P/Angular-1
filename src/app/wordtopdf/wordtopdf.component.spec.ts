import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordtopdfComponent } from './wordtopdf.component';

describe('WordtopdfComponent', () => {
  let component: WordtopdfComponent;
  let fixture: ComponentFixture<WordtopdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WordtopdfComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WordtopdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
