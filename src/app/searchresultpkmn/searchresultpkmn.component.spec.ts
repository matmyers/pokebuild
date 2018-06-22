import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchresultpkmnComponent } from './searchresultpkmn.component';

describe('SearchresultpkmnComponent', () => {
  let component: SearchresultpkmnComponent;
  let fixture: ComponentFixture<SearchresultpkmnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchresultpkmnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchresultpkmnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
