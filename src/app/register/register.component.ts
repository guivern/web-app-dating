import { AlertifyService } from './../_services/alertify.service';
import { AuthService } from './../_services/auth.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Input() valuesFromHome: any;
  @Output() cancelRegister = new EventEmitter;

  model: any = {};
  registerForm: FormGroup;

  constructor(private authService: AuthService, private alertify: AlertifyService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.registerForm = this.formBuilder.group({
      genero: ['hombre'],
      username: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      ciudad: ['', Validators.required],
      pais: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(8)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  register() {
    // this.authService.register(this.model)
    //   .subscribe(() => {
    //     this.alertify.success('Registro exitoso');
    //   }, err => {
    //     this.alertify.error(err);
    //   });
    console.log(this.registerForm.value);
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password').value === form.get('confirmPassword').value
      ? null : { 'mismatch': true };
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

}
