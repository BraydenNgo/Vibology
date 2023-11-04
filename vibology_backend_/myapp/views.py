from django.shortcuts import render, HttpResponse
from django.http import JsonResponse
import requests

# Create your views here.
def home(request):
    return HttpResponse("hello world");

# /analyze endpoint
def analyze(request):
    # Get the authorization header
    auth_header = request.headers.get('Authorization', None)

    if auth_header is not None:
        # Split the header into 'Bearer' and the token itself
        try:
            # Only take the second part of the split which should be the token
            token_type, token = auth_header.split()
            if token_type.lower() != 'bearer':
                return JsonResponse({'error': 'Invalid token type'}, status=400)
        except ValueError:
            # Incorrectly formatted Authorization header
            return JsonResponse({'error': 'Invalid authorization header'}, status=400)
    else:
        # No token was provided
        return JsonResponse({'error': 'No authorization header provided'}, status=401)

    
    # Spotify api endpoint to retrieve user's playlists
    url = "https://api.spotify.com/v1/me/playlists"

    # set the token
    headers = {
        'Authorization': f'Bearer {token}',
    }

    # perform the get request
    response = requests.get(url, headers=headers)
    
    if response.ok:
        # Convert the response to JSON and return it
        return JsonResponse(response.json(), safe=False)
    else:
        # error with the API call
        return JsonResponse({'error': 'Failed to fetch data from Spotify API'}, status=response.status_code)