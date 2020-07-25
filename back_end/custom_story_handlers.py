import re,os,json,urllib

class CustomStoryHandler():

    def __init__(self,html_fac,db):
        self.HTML_FAC = html_fac
        self.DATA_BASE = db

    def is_custom_story(self,path):
        return re.match("^/customStories.*",path)

    def get_resp(self,url):
        if re.match(r"/customStories/new.*",url):
            return self._new_resp()
        elif url == "/customStories":
            return self._index_resp()
        elif url == "/customStories/finalBattle":
            return json.dumps(self.DATA_BASE.get_finally_textboxes())
        elif url == "/customStories/names":
            return json.dumps(self.DATA_BASE.get_story_names())
        return self._custom_story_resp(url)
    
    def post_resp(self,url,body):
        if url == "/customStories/new":
            self._make_story(body)
        elif url == "/customStories/finalBattle":
            return self.DATA_BASE.add_finally_textbox(body["img"],body["dialog"])
        return

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
                        sorted(os.listdir("./front_end/static/imgs/faces"))
                    )
                )
            ) + open("./front_end/static/html/newStory.html").read()
        )

    def _make_story(self,data):
        self.DATA_BASE.insert_story(data)

    def _index_resp(self):
        return self.HTML_FAC.get_html_sting("""
            <main> 
                <div class="border_left"></div>
                <div class="border_right"></div>
                <div class="center">
                    <h2>Custom Stories:</h2>
                        {}
                    <a href="/customStories/new"><button style="width:20%;">Create a New Story!</button></a>
                </div>
            </main>
            """.format(
                "".join(map(
                    lambda name: """
                        <h3><a href="/customStories/{}">{}</a></h3>
                        """.format(urllib.parse.quote(name),urllib.parse.unquote(name)),
                    self.DATA_BASE.get_story_names()
                ))
            ))

    def _custom_story_resp(self,url):
        return self.HTML_FAC.get_html_sting("""
            <main> 
                <div class="border_left"></div>
                <div class="border_right"></div>
                <div class="center">
                    {}
                    <a href="/customStories">
                    <button style="width:100%">Back</button>
                    </a>
                </div>
            </main>
            <script>setPageTitle(unescape('{}'))</script>
            """.format(
                "".join(map(
                    lambda table:"""
                    <div class="textbox {} {}"><p>{}</p></div>
                    """.format(table[3],table[2],urllib.parse.unquote(table[4])),
                    sorted(
                        self.DATA_BASE.get_story(url.split("/")[-1]),
                        key=lambda t:t[1]
            ))),url.split("/")[-1]
            ))