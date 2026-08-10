import subprocess, time, os, sys, json

base = '/c/Users/Kyra/workspace/console-dashboard'
print('Starting Vite build...')
p = subprocess.Popen(
    ['npx', 'vite', '--mode', 'production'],
    stdout=subprocess.PIPE,
    stderr=subprocess.PIPE,
    cwd=base
)

# Wait up to 90s
for i in range(90):
    p.poll()
    if p.returncode is not None:
        break
    time.sleep(1)
    print('Waiting... (' + str(i+1) + '/90)')

if p.returncode is None:
    print('TIMEOUT - killing')
    p.kill()
    p.wait()

# Check results
dist = os.path.join(base, 'dist')
if os.path.exists(dist):
    print('\n=== BUILD RESULTS ===')
    for f in sorted(os.listdir(dist)):
        fp = os.path.join(dist, f)
        if os.path.isfile(fp):
            print(f'  {f}: {os.path.getsize(fp)} bytes')
    # Check for styles.css
    cs = os.path.join(dist, 'styles.css')
    if os.path.exists(cs):
        print('\n=== TAILWIND CSS CHECK ===')
        css = open(cs).read()
        counts = {}
        for kw in ['bg-gray-800', 'rounded-xl', 'p-4', 'bg-gray-900', 'border-gray', 'w-full', 'flex', 'text-sm', 'text-lg', 'font-semibold', 'border-t', 'gap', 'mb', 'icon', 'card', 'container']:
            n = css.count(kw)
            if n > 0:
                counts[kw] = n
        if counts:
            print('Found classes:', json.dumps(counts))
            print('\nBUILD SUCCESSFUL!')
        else:
            print('\nWARNING: No expected Tailwind classes found!')
            print('First 200 chars of CSS:')
            print(css[:200])
    else:
        print('\nWARNING: styles.css not found!')

# Check stderr
try:
    out, err = p.communicate()
    if err:
        print('\nSTDERR:', err.decode()[-500:] if err else '')
except:
    print('\nSTDERR: (process already communicated)')
