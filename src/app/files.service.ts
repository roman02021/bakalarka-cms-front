import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FolderContent } from './files.interface';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class FilesService {
  url = environment.backendUrl;
  constructor(private http: HttpClient) {}
  getRootFolder() {
    return this.http.get<FolderContent>(`${this.url}file/folder`);
  }
  getFolderContent(folderId: number) {
    return this.http.get<FolderContent>(`${this.url}file/folder/${folderId}`);
  }
}
