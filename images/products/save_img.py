import base64, sys
chunk1 = open('/tmp/img_chunk1.txt').read().strip()
chunk2 = open('/tmp/img_chunk2.txt').read().strip()
data = base64.b64decode(chunk1 + chunk2)
with open('glp3-rt.jpg', 'wb') as f:
    f.write(data)
print(f"Saved {len(data)} bytes")
