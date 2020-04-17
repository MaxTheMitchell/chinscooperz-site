class htmlFac:
    def __init__(self,head="",header="",footer=""):
        self.head = head
        self.header = header
        self.footer = footer

    def get_html_bytes(self,body,formating='utf-8'):
        return bytes(self.get_html_sting(body),formating)

    def get_html_sting(self,body):
        return self.head + self.header + body + self.footer