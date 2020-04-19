class htmlFac:
    def __init__(self,head="",header="",footer=""):
        self.head = head
        self.header = header
        self.footer = footer

    def get_html_bytes(self,body,formating='utf-8',head=None):
        return bytes(self.get_html_sting(body,head),formating)

    def get_html_sting(self,body,head=None):
        if head == None:
            head = self.head
        return head + self.header + body + self.footer