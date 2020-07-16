import http.server,socketserver,os
from back_end.handlers import MyHandlers
from back_end.data_base import DataBase

PORT = int(os.getenv("PORT"))
DATA_BASE = DataBase(os.getenv("DATABASE_URL"))

# DATA_BASE.insert_story("test story",1,'none','magic_rat','fyyfusauf')
DATA_BASE.delete_story("test story")
print(str(DATA_BASE.get_story("test story")))

socketserver.TCPServer.allow_reuse_address = True

with socketserver.TCPServer(("",PORT),MyHandlers) as httpd:
    print("on port http://0.0.0.0:{}/".format(PORT))
    httpd.serve_forever()