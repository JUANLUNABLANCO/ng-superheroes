import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  constructor(
    public dialog: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string) { }

    closeDialog(): void {
      this.dialog.close(false);
    }
    confirm(): void {
      this.dialog.close(true);
    }
}
