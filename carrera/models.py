from django.core.mail import send_mail
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.template.loader import render_to_string

from carrera.choices import *
# Create your models here.
class Inscripcion(models.Model):

    numero = models.IntegerField()
    nombres = models.CharField(max_length=45)
    apellidos = models.CharField(max_length=45)
    cedula = models.CharField(max_length=13,unique=True)
    fechaNacimiento = models.DateField()
    telefono = models.CharField(max_length=15)
    email = models.EmailField()
    ciudad  = models.CharField(max_length=45)
    genero = models.CharField(max_length=1, choices=GENEROS, default='Masculino')
    categoria = models.ForeignKey('Categoria', on_delete=models.CASCADE)
    talla  = models.CharField(choices=TALLAS, default='XS',max_length=2)
    tipoDeSangre = models.CharField(choices=TIPOSANGRE, default='A+',max_length=3)
    alergias  = models.CharField(max_length=45)
    club = models.BooleanField(blank=True, default=False)
    clubNombre = models.CharField(max_length=45,blank=True,default='')
    nombreContactoEmergencia = models.CharField(max_length=45)
    telefonoContactoEmergencia = models.CharField(max_length=15)
    Pago = models.NullBooleanField()
    def __str__(self):
        return self.nombres +" " +self.apellidos



class Categoria(models.Model):
    nombre = models.CharField(max_length=30)
    precio = models.DecimalField(max_digits=4, decimal_places=2, blank=True, null=True)

    def __str__(self):
        return self.nombre

@receiver(post_save, sender=Inscripcion)
def do_something_when_user_updated(sender, instance, created, **kwargs):
    if not created:
        # User object updated
        inscripcion = instance


        if inscripcion.Pago:

            ctx = {
                'nombres': inscripcion.nombres + ' '+inscripcion.apellidos,
                'email': inscripcion.email,
            }
            html_part = render_to_string('email/pago.html', ctx)
            send_mail('PAGO ' + inscripcion.nombres + ' '+inscripcion.apellidos, ' ',
                      'info@rutadelempedrado.com',
                      [inscripcion.email, 'info@rutadelempedrado.com'], fail_silently=False,
                      html_message=html_part)
        else:
            pass
