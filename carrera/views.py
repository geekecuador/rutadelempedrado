from datetime import datetime
from django.core.mail import send_mail
from django.db import transaction
from django.http import HttpResponseRedirect
from django.shortcuts import render

# Create your views here.
from django.template.loader import render_to_string
from django.views.generic import TemplateView, FormView, View, ListView
from carrera.forms import InscripcionForm
from carrera.decorators import check_recaptcha
from carrera.models import Inscripcion, Categoria


class IndexView(TemplateView):
    template_name = "index.html"

@check_recaptcha
def comments(request):

    if request.method == 'POST':
        correo = True
        return render(request, 'index_correo.html', {'correo': correo})
    else:

        return render(request, 'index.html', {})


class InscripcionView(View):
    template_name = 'inscripcion.html'
    form_class = InscripcionForm
    success_url = '/gracias/'
    # def form_valid(self, form):
    #     print(form.cleaned_data['nombres'])
    #     form.send_email()
    #     form.save()
    #     return super(InscripcionView, self).form_valid(form)

    def get(self, request, *args, **kwargs):
        form = self.form_class()
        return render(request, self.template_name, {'form': form})

    @transaction.atomic
    def post(self, request, *args, **kwargs):

        try:
            corredor = Inscripcion.objects.get(cedula=request.POST["cedula"])
            if corredor:
                return HttpResponseRedirect('/registroexiste/' + request.POST["cedula"])
        except Inscripcion.DoesNotExist:
            dia = request.POST['dia']
            mes = request.POST['mes']
            ano = request.POST['ano']
            if (dia != '0' and mes != '0' and ano != '0'):
                date = datetime(int(ano), int(mes), int(dia))
            fechaNacimiento = date.date()
            inscripcion = Inscripcion()
            inscripcion.nombres = request.POST['nombres'].title()
            inscripcion.apellidos = request.POST['apellidos'].title()
            inscripcion.cedula = request.POST['cedula']
            inscripcion.telefono = request.POST['telefono']
            inscripcion.email = request.POST['email']
            inscripcion.fechaNacimiento = fechaNacimiento
            inscripcion.ciudad = request.POST['ciudad'].title()
            inscripcion.genero = request.POST['genero']
            inscripcion.categoria = Categoria.objects.get(id=request.POST['categoria'])
            inscripcion.talla = request.POST['talla']
            inscripcion.tipoDeSangre = request.POST['tipoDeSangre']
            inscripcion.alergias = request.POST['alergias']
            inscripcion.club = request.POST.get('club', False)
            inscripcion.clubNombre = request.POST['clubNombre'].title()
            inscripcion.nombreContactoEmergencia = request.POST['nombreContactoEmergencia'].title()
            inscripcion.telefonoContactoEmergencia = request.POST['telefonoContactoEmergencia']
            inscripcion.save()
            ctx = {
                'nombres': request.POST["nombres"] + ' ' + request.POST["apellidos"],
                'valor': Categoria.objects.get(id=request.POST['categoria']).precio,
                'email': request.POST["email"],
            }
            html_part = render_to_string('email/index.html', ctx)
            send_mail('INSCRIPCIÓN ' + request.POST["nombres"].title() + ' ' + request.POST["apellidos"].title(), ' ',
                      'info@rutadelempedrado.com',
                      [request.POST["email"], 'info@rutadelempedrado.com'], fail_silently=False,
                      html_message=html_part)
            return HttpResponseRedirect('/gracias')




class GraciasView(TemplateView):
    template_name = "gracias.html"


def registroexiste(request, cedula):
    corredor = Inscripcion.objects.get(cedula=cedula)
    return render(request, 'registroexiste.html', {'corredor': corredor})