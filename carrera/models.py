from django.db import models
from carrera.choices import *
# Create your models here.
class Inscripcion(models.Model):


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
    club = models.BooleanField(blank=True)
    clubNombre = models.CharField(max_length=45,blank=True)
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