import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FolderContent } from './files.interface';

@Injectable({
  providedIn: 'root',
})
export class FilesService {
  url = 'http://localhost:3000/';
  constructor(private http: HttpClient) {}
  getRootFolder() {
    return this.http.get<FolderContent>(`${this.url}file/folder`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('id_token'),
      },
    });
  }
  getFolderContent(folderId: number) {
    return this.http.get<FolderContent>(`${this.url}file/folder/${folderId}`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('id_token'),
      },
    });
  }
}
