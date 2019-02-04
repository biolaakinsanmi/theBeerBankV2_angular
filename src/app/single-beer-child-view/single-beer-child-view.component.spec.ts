import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleBeerChildViewComponent } from './single-beer-child-view.component';

describe('SingleBeerChildViewComponent', () => {
  let component: SingleBeerChildViewComponent;
  let fixture: ComponentFixture<SingleBeerChildViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleBeerChildViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleBeerChildViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
