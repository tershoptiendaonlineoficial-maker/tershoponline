import re

def fix_file(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        text = f.read()

    # We want to replace $('.class').forEach with $$('.class').forEach
    # which means we look for $ followed by ('some-selector') followed by .forEach
    # A single $ without a second $ in front of it.
    # regex: (?<!\$)\$\(([^)]+)\)\.forEach
    text = re.sub(r"(?<!\$)\$\(([^)]+)\)\.forEach", r"$$(\1).forEach", text)
        
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(text)

fix_file('index.html')
fix_file('app.js')
print("Done fixing")
