import { Component, OnInit } from '@angular/core';
import { sampleData } from './sampledata.component';
import { TreeGridModule, SortService, FilterService, ReorderService, ITreeData } from '@syncfusion/ej2-angular-treegrid';
@Component({
  selector: 'app-treegrid',
  templateUrl: './treegrid.component.html',
  styleUrls: ['./treegrid.component.css']
})
export class TreegridComponent implements OnInit {

  constructor() { }
  public data: Object[] = [];
 
  ngOnInit(): void {
    this.data = sampleData;
   // console.log(this.data)
  }

}
