import re,os
class StoryHandlers:

    def __init__(self,html_fac,html_path):
        self.HTML_FAC = html_fac
        self.HTML_PATH = html_path

    def is_story(self,path):
        return re.match("^/story.*",path)

    def story_resp(self,url):
        if url.split('story')[1] == "/contents":
            return self._table_of_contents()
        if re.match(r".*[0-9]+$",url):
            url = self._fix_story_url(url)
        try:
            return self.HTML_FAC.get_html_sting(
                open(self.HTML_PATH+url+".html").read()+self._set_page_title(url))
        except:
            return "/story/contents"

    def _set_page_title(self,url):
        return "<script>setPageTitle('{}')</script>".format(
            url.split('/')[-1]
        )

    def _fix_story_url(self,url):
        return re.sub(
                r"[0-9]+$",
                next((d.split('.')[0] for d in os.listdir(self.HTML_PATH + re.findall(r"(.+)(\/\d+$)",url)[0][0])
                    if re.findall(r"[0-9]+$",url)[0] == re.findall(r"^[0-9]+",d)[0])
                    ,""
                ),
                url)

    def _table_of_contents(self):
        folders = list(map(
                        lambda directory: self._pages_in_part(directory),
                        filter(lambda f: not '.' in f , sorted(os.listdir(self.HTML_PATH+'/story')))
                    ))
        folders[0],folders[-1] = folders[-1],folders[0]
        return self.HTML_FAC.get_html_sting("""
            <main> 
                <div class="border_left"></div>
                <div class="border_right"></div>
                <div class="center">
                <h2>Table of Contents</h2>
                    {}
                </div>
            </main>
            """.format("".join(folders)
                )
        )

    def _pages_in_part(self,directory):
        return """
            <a href="#"><h3 onClick="toggelDisplay('{}')">{}</h3></a>
            <div id="{}" class="table_contents_text" style="display: none;">{}</div>
            """.format(
                    directory, 
                    directory,
                    directory,
                    "".join(
                        map(
                            lambda file: """
                                <h4><a href="/story/{}/{}">{}</a></h4>
                                """.format(directory,file.split('.')[0],file.split('.')[0]),
                            sorted(os.listdir(self.HTML_PATH+'/story/'+directory))
                        )
                    )
            )