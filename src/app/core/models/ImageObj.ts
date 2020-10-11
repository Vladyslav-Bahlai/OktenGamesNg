// this class is used in image-uploader component to add extra info to selected file
// (isTitle field is used to keep track which image user decided to make a title image)
export class ImageObj {
  file: File;
  isTitle: boolean;

  constructor(file: File, isTitle: boolean) {
    this.file = file;
    this.isTitle = isTitle;
  }
}
