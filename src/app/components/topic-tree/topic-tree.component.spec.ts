import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicTreeComponent } from './topic-tree.component';

describe('TopicControlComponent', () => {
  let component: TopicTreeComponent;
  let fixture: ComponentFixture<TopicTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
