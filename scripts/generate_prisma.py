#!/usr/bin/env python3
import subprocess
import sys

print('[v0] Generating Prisma client...')
try:
    result = subprocess.run(
        ['npx', 'prisma', 'generate'],
        cwd='/vercel/share/v0-project',
        check=True,
    )
    print('[v0] ✓ Prisma client generated successfully!')
except subprocess.CalledProcessError as e:
    print(f'[v0] ✗ Error generating Prisma client')
    sys.exit(1)
