import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contactForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {
    this.contactForm = this.formBuilder.group({
      name: ['', [Validators.required, this.nameValidator()]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  get f() {
    return this.contactForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.contactForm.valid) {
      alert('Validado');

      this.http.post('url_del_servidor', this.contactForm.value)
        .subscribe(
          response => {
            console.log('Formulario enviado correctamente', response);
            alert('Formulario enviado correctamente');
          },
          error => {
            console.error('Error al enviar el formulario', error);
          }
        );
    } else {
      alert('Formulario inválido');
    }
  }

  private nameValidator() {
    return (control: { value: string }) => {
      const valid = /^[a-zA-Z\s]*$/.test(control.value);
      return valid ? null : { invalidName: true };
    };
  }
}
