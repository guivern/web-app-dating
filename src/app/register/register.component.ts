import { AlertifyService } from './../_services/alertify.service';
import { AuthService } from './../_services/auth.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { User } from '../_models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Input() valuesFromHome: any;
  @Output() cancelRegister = new EventEmitter;

  formModel: any;
  registerForm: FormGroup;

  constructor(private authService: AuthService, private alertify: AlertifyService,
    private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.registerForm = this.formBuilder.group({
      genero: ['hombre'],
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
    if (this.registerForm.valid) {
      this.formModel = this.registerForm.value;
      this.formModel.username = this.formModel.nombre;
      this.authService.register(this.formModel)
        .subscribe(() => {
          this.alertify.success('Registro exitoso');
        }, err => {
          this.alertify.error(err);
        }, () => {
          // onComplete
          const { username, password } = this.formModel;
          const credenciales = { username, password };
          this.authService.login(credenciales).subscribe(() => {
            this.router.navigate(['members']);
          });
        });
    }
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password').value === form.get('confirmPassword').value
      ? null : { 'mismatch': true };
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

}
