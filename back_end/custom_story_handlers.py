import re

class CustomStoryHandler():
    def is_custom_story(self,path):
        return re.match("^/customStories.*",path)

    def custom_story_resp(self,url):
        # TODO finish this
        return ""
