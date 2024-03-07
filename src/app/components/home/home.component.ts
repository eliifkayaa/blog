import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { BlogService } from '../../services/blog.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BaseService } from '../../services/base.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog, MatDialogActions, MatDialogContent, MatDialogModule, MatDialogTitle } from '@angular/material/dialog';
import { BlogDialogComponent } from './blog-dialog/blog-dialog.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule, HttpClientModule, NgbModule, MatDialogModule, MatDialogTitle, MatDialogContent, MatDialogActions],
  providers: [BaseService, BlogService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  pageSize = 8;
  page = 13;
  blogData: Array<any> = [];
  constructor(
    private _blogService: BlogService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this._blogService.getPosts().subscribe((res) => {
      // console.log(res);
      this.blogData = res;
    })
  }

  openDialog(element: any, viewOrUpdate: any) {
    const dialogRef = this.dialog.open(BlogDialogComponent, {
      data: { blog: element, isUpdate: viewOrUpdate },
      width: '900px',
      
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getBlogList();
    });
  }

  getBlogList() {
    this._blogService.getPosts().subscribe((res) => {
      // console.log(res);
      this.blogData = res;
    })
  }
}
