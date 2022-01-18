import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorService } from '../helper/validator.service';

@Component({
  selector: 'app-example3',
  templateUrl: './example3.component.html',
  styleUrls: ['./example3.component.css']
})
export class Example3Component implements OnInit {

  signupForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    age: new FormControl('')
  });

  constructor(private fb: FormBuilder, private validationService: ValidatorService) {
  }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      username: [
        '',
        [
          this.validationService.validateInputText
        ]
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(40)
        ]
      ],
      confirmPassword: ['', Validators.required],
      age: ['', [Validators.required, this.validationService.rangeValidator(16, 25)]]
    }, {
      validator: this.validationService.match('password', 'confirmPassword'),
    });
  }

  get f() {
    return this.signupForm.controls;
  }

  onSubmit(): void {
    console.log(JSON.stringify(this.signupForm.value, null, 2));
  }

  onReset(): void {
    this.signupForm.reset();
  }

}
