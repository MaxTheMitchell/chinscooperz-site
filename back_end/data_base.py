import psycopg2
import psycopg2.extras

class DataBase():
    def __init__(self,url):
        self.url = url

    def get_story_names(self):
        def func(cursor):
            cursor.execute(""" 
                SELECT DISTINCT storyName 
                FROM storyTextboxes
                """)
            return cursor.fetchall()
        return self._connect_to_db(func)

    def insert_story(self,data):
        self._connect_to_db(
            lambda cursor : [
            cursor.execute(""" 
                INSERT into storyTextboxes 
                VALUES('{}',{},'{}','{}','{}')
                """.format(
                    data["storyName"],textbox["position"],
                    textbox["animation"],textbox["character"],
                    textbox["dialog"]))
                for textbox in data["textboxes"]
            ])

    def get_story(self,story_name):
        def func(cursor):
            cursor.execute(""" 
                SELECT * FROM storyTextboxes
                WHERE storyName = '{}'
                """.format(story_name))
            return cursor.fetchall()
        return self._connect_to_db(func)

    def delete_story(self,story_name):
        self._connect_to_db(
            lambda cursor : cursor.execute(""" 
                DELETE FROM storyTextboxes 
                WHERE storyName = '{}'
            """.format(story_name))
        )
        
    def _connect_to_db(self,func):
        conn = psycopg2.connect(self.url, sslmode='require')
        return_val = func(conn.cursor(cursor_factory=psycopg2.extras.DictCursor))
        conn.commit()
        conn.close()
        return return_val

