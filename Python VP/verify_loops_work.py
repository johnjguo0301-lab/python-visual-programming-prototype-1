#!/usr/bin/env python3
import requests

# Test if loop code generates when sent to the API
code = """for i in range(0, 5):
    print(i)
"""

print("Testing loop code:")
print(code)
print("\nSending to API...")

try:
    response = requests.post('http://localhost:8080/api/run', json={'code': code}, timeout=5)
    data = response.json()
    print("\nResult:")
    print("stdout:", data.get('stdout'))
    print("stderr:", data.get('stderr'))
except Exception as e:
    print("Error:", e)
