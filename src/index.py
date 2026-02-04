import os
import random
import threading
from time import time

import webview

class Api:
    def fullscreen(self):
        webview.windows[0].toggle_fullscreen()

    def save_content(self, content):
        filename = webview.windows[0].create_file_dialog(webview.SAVE_DIALOG)
        if not filename:
            return

        with open(filename[0], 'w') as f:
            f.write(content)

    def ls(self):
        return os.listdir('.')


def get_entrypoint():
    def exists(path):
        return os.path.exists(os.path.join(os.path.dirname(__file__), path))

    if exists('../gui/index.html'): # unfrozen development
        return '../gui/index.html'

    if exists('../Resources/gui/index.html'): # frozen py2app
        return '../Resources/gui/index.html'

    if exists('./gui/index.html'):
        return './gui/index.html'

    raise Exception('No index.html found')


def set_interval(interval):
    def decorator(function):
        def wrapper(*args, **kwargs):
            stopped = threading.Event()

            def loop(): # executed in another thread
                while not stopped.wait(interval): # until stopped
                    function(*args, **kwargs)

            t = threading.Thread(target=loop)
            t.daemon = True # stop if the program exits
            t.start()
            return stopped
        return wrapper
    return decorator

entry = get_entrypoint()

@set_interval(1)
def update_ticker(window):

    positions = [
        [48.7385745, 37.58618],
        [48.7385845, 37.58518],
        [48.7385645, 37.58718],
    ]

    window.state.ticker = {
        "updatedAt": int(time()),
        "position": random.choice(positions)
    }

if __name__ == '__main__':
    window = webview.create_window('Starlink info', entry, js_api=Api())
    window.events.loaded += lambda: update_ticker(window)
    webview.start()
