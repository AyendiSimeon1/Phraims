import streamlit as st
from llama_index.llms.ollama import Ollama

model = Ollama("microsoft/phi-3")

st.title("Open Source Chatbot")
st.write("Ask me anything!")

# Initialize chat history in session state
if 'chat_history' not in st.session_state:
    st.session_state.chat_history = []

# Function to handle user input and generate a response
def get_response(user_input):
    response = model.chat(user_input)
    return response

# User input field
user_input = st.text_input("You: ")

if user_input:
    # Get response from the model
    bot_response = get_response(user_input)
    
    # Store chat history
    st.session_state.chat_history.append({"user": user_input, "bot": bot_response})

# Display chat history
for chat in st.session_state.chat_history:
    st.write(f"You: {chat['user']}")
    st.write(f"Bot: {chat['bot']}")