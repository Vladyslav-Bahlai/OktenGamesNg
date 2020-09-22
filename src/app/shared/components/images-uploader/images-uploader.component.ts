import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-images-uploader',
  templateUrl: './images-uploader.component.html',
  styleUrls: ['./images-uploader.component.scss']
})
export class ImagesUploaderComponent implements OnInit {

  private selectedFiles: File[] = [];
  private imageUrls = [];
  // event emitter is used to pass updated selectedFiles array to parent component
  @Output() filesEmitter: EventEmitter<File[]> = new EventEmitter<File[]>();

  constructor() {
  }

  ngOnInit() {
  }

  // this method is triggered when new files are added in files input field
  private onFileSelect(event): void {
    const filesToUpload: FileList = event.target.files;

    for (let i = 0; i < filesToUpload.length; ++i) {
      const reader = new FileReader();
      const currentFile = filesToUpload.item(i);
      // when image url is obtained, file is pushed to the selectedFiles
      // and its url is pushed to imageUrls so the indexes are the same for file and url
      reader.onload = () => {
        this.selectedFiles.push(currentFile);
        this.updateFilesEmitter();
        this.imageUrls.push(reader.result);
      };
      // get file URL for each file in file list in order to display them on page
      reader.readAsDataURL(currentFile);
    }
  }

  // delete file and its url by index from both arrays
  private removeFile(index: number): void {
    this.selectedFiles.splice(index, 1);
    this.updateFilesEmitter();
    this.imageUrls.splice(index, 1);
  }

  // updates filesEmitter emitter with selectedFiles data so that changes are visible in the parent component
  private updateFilesEmitter() {
    this.filesEmitter.emit(this.selectedFiles);
  }

}
