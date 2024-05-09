import {
  Component,
  ElementRef,
  contentChild,
  model,
  viewChild,
} from '@angular/core';
import { FilesService } from '../files.service';
import { FolderContent } from '../files.interface';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'file-manager',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './files.component.html',
  styleUrl: './files.component.scss',
})
export class FilesComponent {
  constructor(
    private formBuilder: FormBuilder,
    private filesService: FilesService,
    private http: HttpClient
  ) {}

  folders: FolderContent = {
    files: [],
    folders: [],
  };
  url = environment.backendUrl;
  lastFolderId: number | null = null;
  currentFolderId: number | null = null;

  // fileForm = this.formBuilder.group({
  //   parentId: [this.currentFolderId ?? null, Validators.required],
  //   file: [null, Validators.required],
  // });

  fileForm = new FormGroup({
    file: new FormControl<File | null>(null),
  });
  chosenFile = model<number>(0);

  fileInput = contentChild<ElementRef>('fileInput');

  loadRootFolder() {
    console.log('yoooaoao');
    this.filesService.getRootFolder().subscribe((data) => {
      this.folders = data;
    });
    this.lastFolderId = this.currentFolderId;
    this.currentFolderId = null;
  }
  loadFolderContent(folderId: number) {
    this.filesService.getFolderContent(folderId).subscribe((data) => {
      this.folders = data;
    });
    this.lastFolderId = this.currentFolderId;
    this.currentFolderId = folderId;
  }
  goBack() {
    if (this.lastFolderId === null) {
      this.loadRootFolder();
    } else {
      this.loadFolderContent(this.lastFolderId);
    }
  }
  chooseFile(fileId: number) {
    this.chosenFile.update((curr) => {
      return fileId;
    });
    console.log(this.chosenFile(), 'COCOCO');
  }
  // onSubmit() {
  //   console.log('10');
  //   console.log(this.fileForm.value);

  //   let headers = new HttpHeaders();
  //   // headers.append('Content-Type', 'multipart/form-data');

  //   console.log(this.fileForm.value.file, 'aaa');
  //   const formData = new FormData();

  //   // formData.append('file', this.fileForm.value.file);
  //   headers.append('Accept', 'application/json');
  //   this.http
  //     .post(`${this.url}/file/upload`, this.fileForm.value, {
  //       headers: headers,
  //     })
  //     .subscribe((res) => {
  //       console.log('uploaded');
  //       return res;
  //     });
  // }
  onChange(e: Event) {
    let reader = new FileReader();
    if (e.target) {
      const input = e.target as HTMLInputElement;
      const file = input.files![0];
      this.fileForm.patchValue({
        file: file,
      });
      // reader.readAsDataURL(file);
      // reader.onload = () => {
      //   this.fileForm
      // }

      // console.log(file, this.fileForm.value);

      const formData = new FormData();

      formData.append('file', file);
      // formData.append('parentId', '');

      // new FileReader();

      // let headers = new HttpHeaders();
      // // headers.append('Content-Type', 'multipart/form-data');
      // headers.append('Accept', 'application/json');

      // console.log(formData, 'yo');

      this.http.post(`${this.url}/file/upload`, formData).subscribe((res) => {
        this.loadRootFolder();
        this.fileForm.setValue({
          file: null,
        });
        console.log(this.fileInput());

        return res;
      });
    }
  }

  ngOnInit() {
    this.loadRootFolder();
  }
}
