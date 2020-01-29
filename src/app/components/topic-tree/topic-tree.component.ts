import { NestedTreeControl, FlatTreeControl } from '@angular/cdk/tree';
import { Component, Input, OnInit, Output, EventEmitter, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { MatTreeNestedDataSource, MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material';
import { Topic } from '../../interfaces/topic.interface';
import { TopicApiService } from '../../services/topic-api.service';

@Component({
  selector: 'app-topic-tree',
  templateUrl: './topic-tree.component.html',
  styleUrls: ['./topic-tree.component.scss']
})
export class TopicTreeComponent implements OnInit {

  @Input()
  value: Topic;

  @Output()
  valueChange = new EventEmitter<Topic>();

  treeControl = new FlatTreeControl<Topic>(
    this.getNodeLevel,
    this.isExpandable
  );
  treeFlattener = new MatTreeFlattener(
    this.transformer,
    this.getNodeLevel,
    this.isExpandable,
    this.getChildren
  );
  dataSource = new MatTreeFlatDataSource(
    this.treeControl,
    this.treeFlattener
  );

  constructor(private topicApiService: TopicApiService, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.topicApiService.dataChange.subscribe(data => {
      this.dataSource.data = data;
    });
    this.topicApiService.getTopics();
    this.changeDetectorRef.detectChanges();
  }

  hasChild = (_: number, node: Topic) => !!node.children && node.children.length > 0;
  hExpandClick(event) {
    event.preventDefault();
  }

  filter(term: string) {
    this.topicApiService.filter(term);
  }

  clearFilter() {
    if (this.topicApiService.treeData) {
      this.topicApiService.filter();
    };
  }

  hSelection(event, node: Topic) {
    event.preventDefault();
    this.value = node;
    this.valueChange.emit(node);
    this.changeDetectorRef.detectChanges();
  }

  private transformer(node: Topic, level: number) {
    const supplemental = {
      expandable: !!node.children && node.children.length > 0,
      name: node.label,
      level
    };

    return { ...node, ...supplemental };
  }

  private getNodeLevel(node: Topic) {
    return node.level;
  }

  private isExpandable(node: Topic) {
    return node.expandable;
  }

  private getChildren(node: Topic) {
    return node.children;
  }
}
