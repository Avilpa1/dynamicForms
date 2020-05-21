import { Component } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { BehaviorSubject } from "rxjs";

interface User {
  first?: string;
  last?: string;
  fullName?: string;
}

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  panelOpenState = false;
  form: FormGroup;
  formsArray = new BehaviorSubject<FormGroup[]>(null);
  newUser = new BehaviorSubject<User>(null);
  panelActive;
  response: User[] = [
    { first: "Bob", last: "Robinson", fullName: "Bob Robinson" },
    { first: "Bill", last: "Gates", fullName: "Bill Gates" },
    { first: "Tom", last: "Smith", fullName: "Tom Smith" }
  ]; // endpoint

  constructor() {
    this.newUser.next({});
    this.createForms();
  }

  createForms() {
    let tempArray = [];
    for (let i = 0; i < this.response.length; i++) {
      tempArray.push(
        new FormGroup({
          first: new FormControl(this.response[i].first),
          last: new FormControl(this.response[i].last)
        })
      );
      this.formsArray.next(tempArray);
    }
  }

  addNewUser() {
    if (this.newUser.value.first) {
    let temp = this.newUser.subscribe((response: User) => {
      console.log(response);
      let fullName = `${response.first} ${response.last}`;
      let newUser: User = {
        ...response,
        fullName
      };
      this.response.push(newUser);
      
    });
    console.log(temp)
    temp.unsubscribe();
    console.log(temp)
    this.createForms();
    // this.newUser.next(null)
    } else {
      console.log('No user name entered.')
    }
  }

  update(index) {
    let tempArray = this.formsArray.getValue();
    this.response[index].fullName = `${tempArray[index].value.first} ${
      tempArray[index].value.last
    }`;

    this.toggle(index)
  }

  delete(index) {
    let tempArray = this.formsArray.getValue();
    tempArray.splice(index, 1);
    this.response.splice(index, 1);
    this.formsArray.next(tempArray);
    this.panelActive = null;
  }

  setPanelState(index: number) {
    this.panelActive = index;
  }

  toggle(index) {
    this.panelActive !== index ? this.panelActive = index : this.panelActive = null;
  }

}