import { Component, OnInit, inject } from '@angular/core';
import {
  HttpClient,
  HttpClientModule,
  provideHttpClient,
} from '@angular/common/http';
import { CollectionService } from './collection.service';
import { Collection } from './collection.interface';
import { FolderContent } from './files.interface';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from './auth.service';
import { FilesService } from './files.service';
import { FolderComponent } from './folder/folder.component';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';

@Component({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FolderComponent,
    LoginComponent,
  ],
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'zemanik-cms';
  collections: Collection[] = [];
  folders: FolderContent = {
    files: [],
    folders: [],
  };

  private authService = inject(AuthService);

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private collectionService: CollectionService,
    private filesService: FilesService
  ) {}

  ngOnInit() {}

  loadCollections() {
    console.log(this.authService.token, 'yppp');
    this.collectionService.getAllCollections().subscribe((data) => {
      this.collections = data;
    });
  }

  loadRootFolder() {
    console.log('yoooaoao');
    this.filesService.getRootFolder().subscribe((data) => {
      this.folders = data;
    });
  }
  loadFolderContent(folderId: number) {
    this.filesService.getFolderContent(folderId).subscribe((data) => {
      this.folders = data;
    });
  }
}
