import {Component} from '@angular/core';
import {StudentService} from "./student.service";

@Component({
  selector: 'arrow-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent {
  constructor(public service: StudentService) {
  }
}
