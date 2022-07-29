# Import "chatbot" from
# chatterbot package.
# from chatterbot import ChatBot, constants
from chatbot import Chat
# # Inorder to train our bot, we have
# # to import a trainer package
# # "ChatterBotCorpusTrainer"
# from chatterbot.trainers import ChatterBotCorpusTrainer

import sys

# class PythonServer(object):
# def train_chat_bot():
#     chatbot = ChatBot("NAME!")
#     # Create a new trainer for the chatbot
#     trainer = ChatterBotCorpusTrainer(chatbot)
    
#     # Now let us train our bot with multiple corpus
#     trainer.train("chatterbot.corpus.english.greetings",
#                 "chatterbot.corpus.english.conversations" )
#     return chatbot

def chat_bot_message(text):
    chatbot = ChatBot("NAME!")
    # Create a new trainer for the chatbot
    trainer = ChatterBotCorpusTrainer(chatbot)
    
    # Now let us train our bot with multiple corpus
    trainer.train("chatterbot.corpus.english.greetings",
                "chatterbot.corpus.english.conversations" )   
    res = chatbot.get_response(text)
    return res
a = Chat()
a._startNewSession(0)
a.conversation[0].append('Say "Hello"')
p = a.converse()
print(p);
# print(chat_bot_message(sys.argv[0]))
sys.stdout.flush()