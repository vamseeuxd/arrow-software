import {Injectable} from '@angular/core';
import {BehaviorSubject, combineLatest, Observable, of} from "rxjs";
import {StudentInterface} from "./student.interface";
import {switchMap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private data: StudentInterface[] = [];
  private studentListAction: BehaviorSubject<StudentInterface[]> = new BehaviorSubject<StudentInterface[]>(this.data);
  studentList$: Observable<StudentInterface[]> = this.studentListAction.asObservable();
  private selectedCountry = '';
  private selectedCountryAction: BehaviorSubject<string> = new BehaviorSubject<string>(this.selectedCountry);
  private selectedCountry$: Observable<string> = this.selectedCountryAction.asObservable();

  countriesList$ = of([
    {name: 'India', id: 'india'},
    {name: 'USA', id: 'usa'},
    {name: 'Australia', id: 'australia'},
    {name: 'Germany', id: 'germany'},
  ]);

  stateList$ = of([
    {name: 'AP', id: 'ap', country: 'india'},
    {name: 'UP', id: 'up', country: 'india'},
    {name: 'MP', id: 'mp', country: 'india'},
    {name: '123', id: '123', country: 'germany'},
    {name: '456', id: '456', country: 'germany'},
    {name: '789', id: '789', country: 'germany'},
    {name: '1011', id: '1011', country: 'germany'},
    {name: 'usa-123', id: 'usa-123', country: 'usa'},
    {name: 'usa-456', id: 'usa-456', country: 'usa'},
    {name: 'usa-789', id: 'usa-789', country: 'usa'},
    {name: 'usa-1011', id: 'usa-1011', country: 'usa'},
    {name: 'australia-123', id: 'australia-123', country: 'australia'},
    {name: 'australia-456', id: 'australia-456', country: 'australia'},
    {name: 'australia-789', id: 'australia-789', country: 'australia'},
    {name: 'australia-1011', id: 'australia-1011', country: 'australia'},
  ]);

  filteredStates$ = combineLatest(this.selectedCountry$, this.stateList$).pipe(
    switchMap(([selectedCountry, stateList]) => {
      return of(stateList.filter(d => d.country === selectedCountry));
    })
  )

  constructor() {
  }

  addStudent(student: StudentInterface): void {
    student.id = new Date().getTime().toString();
    this.data.push(student);
    this.studentListAction.next(this.data);
  }

  getStudents(): Observable<StudentInterface[]> {
    return this.studentList$;
  }

  updateStudent(student: StudentInterface, id: string) {
    this.data = this.data.map(value => {
      if (value.id === id) {
        return {id, ...student}
      } else {
        return value;
      }
    });
    this.studentListAction.next(this.data);
  }

  deleteStudent(id: string) {
    this.data = this.data.filter(value => (value.id !== id));
    this.studentListAction.next(this.data);
  }

  setSelectedCountry(countryId: string) {
    this.selectedCountry = countryId;
    this.selectedCountryAction.next(this.selectedCountry);
  }
}
