import http.server,socketserver,os
from back_end.handlers import MyHandlers

PORT = int(os.getenv("PORT"))

with socketserver.TCPServer(("",PORT),MyHandlers) as httpd:
    print("on port {}".format(PORT))
    httpd.serve_forever()