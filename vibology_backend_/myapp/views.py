from django.shortcuts import render, HttpResponse

# Create your views here.
def home(request):
    return HttpResponse("hello world");

def analyze(request):
    print("HELLO");
    return HttpResponse("Analyzing spotify playlist");