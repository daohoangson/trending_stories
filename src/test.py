import re
from underthesea import pos_tag, sent_tokenize

file = open('test.log', 'r') 
contents = file.read() 
plain = re.sub('<[^<]+?>', '', contents)

sentences = sent_tokenize(plain)
for sentence in sentences:
  tags = pos_tag(sentence)

  prev = []
  for tag in tags:
    if tag[1][0] != 'N':
      if len(prev) > 1: print(prev)
      prev = []
      continue

    print(tag)

    prev.append(tag[0])

  if len(prev) > 1: print(prev)
