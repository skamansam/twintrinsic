import re
import os

def migrate(content):
    original = content
    # Pattern 1: <svelte:fragment slot="X">...</svelte:fragment>
    content = re.sub(r'<svelte:fragment\s+slot="(\w+)"\s*>', r'{#snippet \1()}', content)
    content = re.sub(r'</svelte:fragment>', r'{/snippet}', content)
    
    # Pattern 2: <TAG slot="Y">...</TAG>
    result = []
    pos = 0
    while pos < len(content):
        m = re.search(r'<(\w[\w-]*)\s+slot="(\w+)"\s*>', content[pos:])
        if not m:
            result.append(content[pos:])
            break
        tag = m.group(1)
        slot = m.group(2)
        start = pos + m.start()
        result.append(content[pos:start])
        result.append('{#snippet ' + slot + '()}')
        depth = 1
        scan = pos + m.end()
        open_pat = re.compile(r'<' + re.escape(tag) + r'(?:\s[^>]*?)?>')
        close_pat = re.compile(r'</' + re.escape(tag) + r'>')
        close_end = None
        while depth > 0 and scan < len(content):
            no = open_pat.search(content, scan)
            nc = close_pat.search(content, scan)
            if not nc:
                break
            if no and no.start() < nc.start():
                depth += 1
                scan = no.end()
            else:
                depth -= 1
                scan = nc.end()
                if depth == 0:
                    close_end = scan
        if close_end is None:
            result.append(content[start:start + m.end()])
            pos = start + m.end()
            continue
        body_end = scan - len('</' + tag + '>')
        result.append(content[pos + m.end():body_end])
        result.append('{/snippet}')
        content = content[close_end:]
        pos = 0
    return ''.join(result)


files = [
    'src/routes/docs/components/Accordion/Accordion/+page.svelte',
    'src/routes/docs/components/BottomBar/BottomBar/+page.svelte',
    'src/routes/docs/components/Card/Card/+page.svelte',
    'src/routes/docs/components/Carousel/Carousel/+page.svelte',
    'src/routes/docs/components/Menu/Menu/+page.svelte',
    'src/routes/docs/components/Panel/Panel/+page.svelte',
    'src/routes/docs/components/App/App/+page.svelte',
    'src/routes/docs/components/+page.svelte',
    'src/routes/docs/components/Lazy/LazyPanel/+page.svelte',
]

for path in files:
    if not os.path.exists(path):
        print(f'MISSING: {path}')
        continue
    with open(path) as f:
        original = f.read()
    new = migrate(original)
    if new != original:
        with open(path, 'w') as f:
            f.write(new)
        print(f'MIGRATED: {path}')
    else:
        print(f'UNCHANGED: {path}')
