import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit, forwardRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogModule, MatDialogTitle, MatDialogContainer } from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import { CommentService } from '../../../services/comment.service';
import { BaseService } from '../../../services/base.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatFormFieldControl, MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlogService } from '../../../services/blog.service';

@Component({
  selector: 'app-blog-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule, MatDialogTitle, MatDialogContent, MatDialogActions, MatDividerModule, MatDialogContainer, FormsModule, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule],
  providers: [BaseService, CommentService, BlogService],
  templateUrl: './blog-dialog.component.html',
  styleUrl: './blog-dialog.component.css'
})
export class BlogDialogComponent implements OnInit  {

  isUpdateView: boolean = false; 
  imageUrl: string = '';
  title: string = '';
  body: string = '';
  commentData: any;

  form = new FormGroup({
    title : new FormControl(null, [Validators.required]),
    body: new FormControl(null, [Validators.required])
  })

  constructor(
    private blogService : BlogService,
    public commentService: CommentService,
    @Inject(MAT_DIALOG_DATA) private data: any,
    public dialogRef: MatDialogRef<BlogDialogComponent>,) {

    if(data.isUpdate) {
      this.isUpdateView = true; // data içideki isUpdated=true ise isUpdateView=true olmalıdır.
      this.form.patchValue({
        title: data.blog.title,
        body: data.blog.body
      })
      
    } else {  //false
      this.imageUrl = data.blog.imageId.toString();
      this.title = data.blog.title;
      this.body = data.blog.body;
    }
  }

  ngOnInit(): void {
    this.commentService.getComments().subscribe((res) => {
      this.commentData = res.filter((x: { postId: any; }) => x.postId == this.data.blog.id);
    })
  }

  close() {
    this.dialogRef.close();
  }

  onSubmit() {
    const request = {
      title : this.form.get('title')?.value,
      body : this.form.get('body')?.value,
      imageId : this.data.blog.imageId,
      userId : this.data.blog.userId,
    }
    this.blogService.updatePosts(this.data.blog.id, request).subscribe((res) => {
        this.dialogRef.close();
    })
  }


}
