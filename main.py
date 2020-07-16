import http.server,socketserver,os
from back_end.handlers import MyHandlers
from back_end.data_base import DataBase

PORT = int(os.getenv("PORT"))
DATA_BASE = DataBase(os.getenv("DATABASE_URL"))

socketserver.TCPServer.allow_reuse_address = True

with socketserver.TCPServer(("",PORT),MyHandlers) as httpd:
    print("on port http://0.0.0.0:{}/".format(PORT))
    httpd.serve_forever()