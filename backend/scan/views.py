import ssl
import socket
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import ScanResultSerializer
from .scanner import run_scan

# Function to check supported TLS versions for a domain
def check_tls_versions(domain):
    tls_versions = ['TLSv1.1', 'TLSv1.2', 'TLSv1.3']
    supported_versions = []

    for version in tls_versions:
        try:
            context = ssl.create_default_context()
            context.options |= getattr(ssl, f"PROTOCOL_{version.replace('.', '')}")
            connection = context.wrap_socket(socket.socket(socket.AF_INET), server_hostname=domain)
            connection.connect((domain, 443))  # Assuming the service is running on port 443 (HTTPS)
            supported_versions.append(version)
            connection.close()
        except (ssl.SSLError, socket.error) as e:
            print(f"Error connecting to {domain} using {version}: {e}")
            pass  # If version is not supported, skip it

    return supported_versions

class ScanView(APIView):
    def post(self, request):
        url = request.data.get('url')
        if not url:
            return Response({"error": "URL is required"}, status=status.HTTP_400_BAD_REQUEST)

        # Extract domain from the URL (remove 'http://' or 'https://')
        domain = url.replace('http://', '').replace('https://', '').split('/')[0]

        try:
            # Run the scanning logic
            scan_results = run_scan(url)
        except Exception as e:
            print(f"Error occurred during scan: {e}")
            return Response({"error": "Error occurred during scan process."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        # Check TLS versions
        try:
            tls_versions = check_tls_versions(domain)
            scan_results['tls_versions'] = tls_versions
        except Exception as e:
            print(f"Error checking TLS versions: {e}")
            scan_results['tls_versions'] = []

        # Serialize and return the results
        serializer = ScanResultSerializer(scan_results)
        return Response(serializer.data)
