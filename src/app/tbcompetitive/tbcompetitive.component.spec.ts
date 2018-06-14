import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TbcompetitiveComponent } from './tbcompetitive.component';

describe('TbcompetitiveComponent', () => {
  let component: TbcompetitiveComponent;
  let fixture: ComponentFixture<TbcompetitiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TbcompetitiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TbcompetitiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
