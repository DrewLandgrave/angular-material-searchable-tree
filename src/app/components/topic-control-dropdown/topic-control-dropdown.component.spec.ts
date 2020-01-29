import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicControlDropdownComponent } from './topic-control-dropdown.component';

describe('TopicControlDropdownComponent', () => {
  let component: TopicControlDropdownComponent;
  let fixture: ComponentFixture<TopicControlDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicControlDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicControlDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
