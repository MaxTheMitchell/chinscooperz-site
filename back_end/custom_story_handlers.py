import re,os

class CustomStoryHandler():

    def __init__(self,html_fac,db):
        self.HTML_FAC = html_fac
        self.DATA_BASE = db

    def is_custom_story(self,path):
        return re.match("^/customStories.*",path)

    def custom_story_resp(self,url):
        if url == "/customStories/new":
            return self._new_resp()
        return self._index_resp()

    def _new_resp(self):
        return self.HTML_FAC.get_html_sting(
            """
            <script>
                let characters = {}
            </script>
            """.format(
                list(
                    map(
                        lambda img: img.split('.')[0],
                        os.listdir("./front_end/static/imgs/faces")
                    )
                )
            ) + open("./front_end/static/html/newStory.html").read()
        )

    def _index_resp(self):
        return self.HTML_FAC.get_html_sting("""
            <main> 
                <div class="border_left"></div>
                <div class="border_right"></div>
                <div class="center">
                    <h2>Custom Stories:</h2>
                        {}
                    <h3><a href="/customStories/new">Create a Story</a></h3>
                </div>
            </main>
            """.format(
                "".join(map(
                    lambda story_name: """
                        <h4><a href="/customStories/{}">{}</a></h4>
                        """.format(story_name,story_name),
                    self.DATA_BASE.get_story_names()
                ))
            ))