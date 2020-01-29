import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Topic } from '../interfaces/topic.interface';
import {jsonData} from '../testData';

@Injectable({
  providedIn: 'root'
})
export class TopicApiService {

  dataChange: BehaviorSubject<Topic[]> = new BehaviorSubject<Topic[]>([]);
  treeData: Topic[];

  constructor(private httpClient: HttpClient) { }

  getTopics(): void {

    this.httpClient.get<Topic[]>(
      'http://localhost:8180/hub/cmsframework/option/topic_tree?filters={%22edition%22:[%22us%22,%22au%22]}',
      {
        withCredentials: true,
        headers: new HttpHeaders({
          'X-Requested-With': 'XMLHttpRequest',
        })
      }).pipe(
        catchError(() => {
          return of(jsonData);
        })
      ).subscribe((data: Topic[]) => {
        this.treeData = data;
        this.treeData.forEach(topic => {
          this.buildTitles(topic, false);
        });
        this.dataChange.next(data);
      });
  }

  buildTitles(topic, parent) {
    parent = parent || false;

    topic.title = topic.label + (parent ? ' (' + parent.title + ')' : '');

    // leaf node -  a single topic is listed by key:object
    if (topic.children.length === 0) {
      return;
    }

    // branch node - populate children
    const children = topic.children;
    children.forEach(child => {
      this.buildTitles(child, topic);
    });
  }

  filter(term: string = null): void {
    let filteredTreeData: Topic[];
    if (term) {
      filteredTreeData = this.filterTreeData(term, this.treeData);
    } else {
      filteredTreeData = this.treeData;
    }
    this.dataChange.next(filteredTreeData);
  }

  filterTreeData(term: string, treeData: Topic[]): Topic[] {
    let topics: Topic[] = [];
    treeData.filter((value) => {
      if (value.label.toLowerCase().indexOf(term.toLowerCase()) > -1) {
        topics.push({
          value: value.value,
          label: value.label,
          data: value.data,
          title: value.title,
          children: value.children,
          expandable: false,
          level: 0,
        });
      }

      if (value.children.length > 0) {
        const filteredChildren = this.filterTreeData(term, value.children);
        topics = topics.concat(filteredChildren);
      }
    });

    return topics;
  }
}
