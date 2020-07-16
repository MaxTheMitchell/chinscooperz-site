import psycopg2

class DataBase():
    def __init__(self,url):
        self.url = url

    def insert_story(self,story_name,position,animation,character,dialogue):
        self._connect_to_db(
            lambda cursor : cursor.execute(""" 
                INSERT into storyTextboxes 
                VALUES('{}',{},'{}','{}','{}')
            """.format(story_name,position,animation,character,dialogue))
        )

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
        return_val = func(conn.cursor())
        conn.commit()
        conn.close()
        return return_val

