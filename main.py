import http.server,socketserver,os
from back_end.handlers import MyHandlers

PORT = int(os.getenv("PORT"))

socketserver.TCPServer.allow_reuse_address = True

with socketserver.TCPServer(("",PORT),MyHandlers) as httpd:
    print("on port http://0.0.0.0:{}/".format(PORT))
    httpd.serve_forever()