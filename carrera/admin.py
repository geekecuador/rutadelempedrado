from django.contrib import admin
from .models import Categoria,Inscripcion
# Register your models here.
admin.site.register(Categoria)

@admin.register(Inscripcion)
class InscripcionAdmin(admin.ModelAdmin):
  search_fields = ['apellidos',]
  list_display = ('nombres','apellidos','categoria','Pago')
  list_filter = ('categoria','Pago')
