import { Component, OnInit, ViewChild, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { TopicTreeComponent } from '../topic-tree/topic-tree.component';
import { Topic } from '../../interfaces/topic.interface';


@Component({
  selector: 'app-topic-control-dropdown',
  templateUrl: './topic-control-dropdown.component.html',
  styleUrls: ['./topic-control-dropdown.component.scss']
})
export class TopicControlDropdownComponent implements OnInit {
  classList = {
    hidden: true,
    'topic-container': true,
  };
  searchFilter: Subject<string> = new Subject<string>();

  @ViewChild('topicControl', { static: true, read: TopicTreeComponent })
  topicControl: TopicTreeComponent;

  @ViewChild('input', { static: true })
  input: ElementRef;

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.searchFilter.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(value => {
      if (value && value.length >= 3) {
        this.topicControl.filter(value);
      } else {
        this.topicControl.clearFilter();
      }
    });
  }

  hFocus() {
    this.topicControl.clearFilter();
    this.classList.hidden = false;
  }

  hBlur(event) {
    event.preventDefault();
    setTimeout(() => {
      if (!document.activeElement.closest('app-topic-tree')) {
        this.classList.hidden = true;
      }
    }, 1);
  }

  hTopicValueChange(topic: Topic) {
    this.input.nativeElement.value = topic.title;
    this.classList.hidden = true;
    this.cd.detectChanges();
  }

  filterChanged(filter: string): void {
    this.searchFilter.next(filter);
  }

}
