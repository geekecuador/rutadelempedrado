from django.http import HttpResponseRedirect
from django.shortcuts import render

# Create your views here.
from django.views.generic import TemplateView, FormView, View, ListView
from carrera.forms import InscripcionForm
from carrera.decorators import check_recaptcha
from carrera.models import Inscripcion


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
    print("Vista de inscripcion")
    # def form_valid(self, form):
    #     print(form.cleaned_data['nombres'])
    #     form.send_email()
    #     form.save()
    #     return super(InscripcionView, self).form_valid(form)

    def get(self, request, *args, **kwargs):
        form = self.form_class()
        return render(request, self.template_name, {'form': form})


    def post(self, request, *args, **kwargs):
        print("Metodo post")
        form = InscripcionForm(data=request.POST)
        print(form)
        content = form.cleaned_data['nombres']
        print(content)
        if request.method =='POST':
            # <process form cleaned data>
            if form.is_valid():
                try:
                    corredor = Inscripcion.objects.get(cedula=form.cleaned_data["cedula"])
                    if corredor:
                        return HttpResponseRedirect('/registroexiste/' + form.cleaned_data["cedula"])
                except Inscripcion.DoesNotExist:
                    form.save()
                    return HttpResponseRedirect('/gracias')

            else:
                return render(request, self.template_name, {'form': form})
        return render(request, self.template_name, {'form': form})


class GraciasView(TemplateView):
    template_name = "gracias.html"


def registroexiste(request, cedula):
    corredor = Inscripcion.objects.get(cedula=cedula)
    return render(request,'registroexiste.html',{'corredor':corredor})