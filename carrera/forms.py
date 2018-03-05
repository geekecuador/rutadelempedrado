from django import forms
from django.core.mail import send_mail
from django.template.loader import render_to_string

from carrera.models import Inscripcion, Categoria
from carrera.choices import *


class InscripcionForm(forms.Form):
    nombres = forms.CharField(label='Nombres',required=True,widget=forms.TextInput(attrs=
                                      {
                                          'class': 'form-control',
                                          'placeholder': 'Ej.: David Andrés ',
                                          'autocomplete':'name'
                                      }))
    apellidos = forms.CharField(label='Apellidos',widget=forms.TextInput(attrs=
                                      {
                                          'class': 'form-control',
                                                   'placeholder': 'Ej.: Pérez Gómez ',
                                          'autocomplete': 'family-name'
                                      }))
    cedula = forms.CharField(label='Cédula',widget=forms.TextInput(attrs=
                                      {
                                          'class': 'form-control',
                                          'placeholder': 'Ej.: 1710004576 ',

                                      }))
    fechaNacimiento = forms.DateField(label='Fecha de Nacimiento', input_formats=['%m-%d-%Y'],
                                      widget=forms.TextInput(attrs=
                                      {
                                          'id': 'datepicker',
                                          'class': 'form-control',
                                          'placeholder':'Ej.: 12-24-1993'
                                      }))
    telefono = forms.CharField(label='Teléfono',widget=forms.TextInput(attrs=
                                      {
                                          'class': 'form-control',
                                                   'placeholder':'Ej.: 0991436758',
                                          'autocomplete': 'tel-national'
                                      }))
    email = forms.EmailField(label='E-mail',widget=forms.EmailInput(attrs=
                                      {
                                          'class': 'form-control',
                                          'placeholder': 'Ej.: dperez@rutadelempedrado.com',
                                          'autocomplete': 'email'
                                      }))
    ciudad = forms.CharField(widget=forms.TextInput(attrs=
                                      {
                                          'class': 'form-control',
                                          'placeholder': 'Ej.: Quito'
                                      }))
    genero = forms.ChoiceField(choices=GENEROS,widget=forms.Select(attrs=
                                      {
                                          'class': 'form-control',

                                      }))
    categoria = forms.ModelChoiceField(queryset=Categoria.objects.all(),widget=forms.Select(attrs=
                                      {
                                          'class': 'form-control'
                                      }))
    talla = forms.ChoiceField(choices=TALLAS,widget=forms.Select(attrs=
                                      {
                                          'class': 'form-control'
                                      }))
    tipoDeSangre = forms.ChoiceField(choices=TIPOSANGRE,widget=forms.Select(attrs=
                                      {
                                          'class': 'form-control'
                                      }))
    alergias = forms.CharField(widget=forms.TextInput(attrs=
                                      {
                                          'class': 'form-control',
                                          'placeholder': 'Ej.: Ninguna'

                                      }))
    club = forms.BooleanField(initial=False,required=False)
    clubNombre = forms.CharField(
        widget=forms.TextInput(attrs=
        {
            'class': 'form-control',
            'placeholder': 'Ej.: TAT',
            'type':'hidden'

        }),required=False
    )
    nombreContactoEmergencia = forms.CharField(label='Nombre de contacto de emergencia',widget=forms.TextInput(attrs=
                                      {
                                          'class': 'form-control',
                                          'placeholder': 'Ej.: Gloria Gómez'
                                      }))
    telefonoContactoEmergencia = forms.CharField(label='Teléfono de contacto de emergencia',widget=forms.TextInput(attrs=
                                      {
                                          'class': 'form-control',
                                          'placeholder': 'Ej.: 0994435143'
                                      }))

    def send_email(self):
        # send email using the self.cleaned_data dictionary
        pass

    def save(self):
        data = self.cleaned_data

        inscripcion = Inscripcion()
        inscripcion.nombres = data['nombres'].capitalize()
        inscripcion.apellidos = data['apellidos'].capitalize()
        inscripcion.cedula = data['cedula']
        inscripcion.fechaNacimiento = data['fechaNacimiento']
        inscripcion.telefono = data['telefono']
        inscripcion.email = data['email']
        inscripcion.ciudad = data['ciudad'].capitalize()
        inscripcion.genero = data['genero']
        inscripcion.categoria = data['categoria']
        inscripcion.talla = data['talla']
        inscripcion.tipoDeSangre = data['tipoDeSangre']
        inscripcion.alergias = data['alergias']
        inscripcion.club = data['club']
        inscripcion.clubNombre = data['clubNombre'].capitalize()
        inscripcion.nombreContactoEmergencia = data['nombreContactoEmergencia'].capitalize()
        inscripcion.telefonoContactoEmergencia = data['telefonoContactoEmergencia']
        inscripcion.save()
        # ctx = {
        #     'nombres': data['nombres'],
        # }
        # html_part = render_to_string('email/index.html', ctx)
        # send_mail('Inscripción de ' + data['nombres'] + data['apellidos'], ' ', 'info@rutadelempedrado.com.ec',
        #           [data['email'],], fail_silently=False,
        #           html_message=html_part)