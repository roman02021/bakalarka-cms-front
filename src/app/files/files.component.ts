import { Component, model } from '@angular/core';
import { FilesService } from '../files.service';
import { FolderContent } from '../files.interface';

@Component({
  selector: 'file-manager',
  standalone: true,
  imports: [],
  templateUrl: './files.component.html',
  styleUrl: './files.component.scss',
})
export class FilesComponent {
  constructor(private filesService: FilesService) {}

  folders: FolderContent = {
    files: [],
    folders: [],
  };

  lastFolderId: number | null = null;
  currentFolderId: number | null = null;

  chosenFile = model<number>(0);

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

  ngOnInit() {
    this.loadRootFolder();
  }
}
