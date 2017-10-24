#!/usr/bin/env python3

import re
import os
import sys
import requests

from pathlib import Path

def main():
    if len(sys.argv) != 2:
        print('Usage: {} PATH_TO_CHROME_EXTENSION'.format(sys.argv[0]))
        sys.exit(2)

    ext_path = Path(sys.argv[1])
    re_pac = re.compile(r"^\{id: 'pac_(.+?)', .+, " +
                        r"pac_url: '(.+?)', name: '(.+?)'")
    pac_dir = Path(__file__).parent.joinpath('../pac')
    with ext_path.joinpath('js/popup2.js').open() as f:
        for line in f:
            match = re_pac.match(line.strip())
            if not match:
                continue
            print('Fetching {} ({})... '.format(match.group(1), match.group(3)),
                  end='', flush=True)
            r = requests.get(match.group(2))
            if r.status_code == 200:
                filename = match.group(1) + '.pac'
                pac_dir.joinpath(filename).write_text(r.text)
                print('OK')
            else:
                print('Failed')

if __name__ == '__main__':
    main()
