import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestingCentersComponent } from './testing-centers.component';

describe('TestingCentersComponent', () => {
  let component: TestingCentersComponent;
  let fixture: ComponentFixture<TestingCentersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestingCentersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestingCentersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
