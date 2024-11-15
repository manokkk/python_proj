from rest_framework import serializers

class ScanResultSerializer(serializers.Serializer):
    open_ports = serializers.ListField(child=serializers.IntegerField())
    vulnerabilities = serializers.ListField(child=serializers.CharField())
    ssl_info = serializers.CharField()
    tls_versions = serializers.ListField(child=serializers.CharField())