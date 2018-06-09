import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarpbComponent } from './navbarpb.component';

describe('NavbarpbComponent', () => {
  let component: NavbarpbComponent;
  let fixture: ComponentFixture<NavbarpbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarpbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarpbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
