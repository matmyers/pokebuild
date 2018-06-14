import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PkmncubbyComponent } from './pkmncubby.component';

describe('PkmncubbyComponent', () => {
  let component: PkmncubbyComponent;
  let fixture: ComponentFixture<PkmncubbyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PkmncubbyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PkmncubbyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
