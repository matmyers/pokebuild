import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TbselectComponent } from './tbselect.component';

describe('TbselectComponent', () => {
  let component: TbselectComponent;
  let fixture: ComponentFixture<TbselectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TbselectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TbselectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
