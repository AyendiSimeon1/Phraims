import streamlit as st
import requests
import uuid

# Title and Description
st.title("💬 Hugging Face Chatbot")
st.write(
    "This is a chatbot that uses Hugging Face models to generate responses. "
    "To use this app, you need to provide your Hugging Face API token."
)

# Access Hugging Face API Token from secrets.toml
hf_api_token = st.secrets["HUGGINGFACE_API_TOKEN"]

if not hf_api_token:
    st.info("Please add your Hugging Face API key to continue.", icon="🗝️")
else:
    # Define Models
    API_MODELS = {
        "BlenderBot (Recommended)": "facebook/blenderbot-400M-distill",
        "DialoGPT (Conversational)": "microsoft/DialoGPT-medium",
        "Flan-T5 (Versatile)": "google/flan-t5-base",
        "GPT-Neo (Advanced)": "EleutherAI/gpt-neo-1.3B"
    }

    # Client to interact with Hugging Face API
    class HuggingFaceChatbot:
        def __init__(self):
            self.reset_chat()

        def reset_chat(self):
            if "messages" not in st.session_state:
                st.session_state.messages = []

        def get_api_url(self, model_name):
            return f"https://api-inference.huggingface.co/models/{model_name}"

        def query_huggingface(self, user_input, model_name):
            api_url = self.get_api_url(model_name)
            headers = {
                "Authorization": f"Bearer {hf_api_token}",
                "Content-Type": "application/json"
            }

            payload = {
                "inputs": user_input,
                "parameters": {
                    "max_new_tokens": 150,
                    "temperature": 0.7,
                    "top_p": 0.9
                }
            }

            try:
                response = requests.post(api_url, headers=headers, json=payload, timeout=30)

                if response.status_code == 200:
                    return response.json()
                else:
                    return {"error": f"API Error: {response.status_code} - {response.text}"}

            except requests.exceptions.RequestException as e:
                return {"error": f"Network error occurred: {str(e)}"}

        def process_message(self, user_input, selected_model):
            if not user_input.strip():
                st.warning("Please enter a message.")
                return

            response = self.query_huggingface(user_input, API_MODELS[selected_model])

            if 'error' in response:
                st.session_state.error_message = response['error']
                bot_response = "I'm sorry, but I encountered an error processing your message."
            else:
                # Check for expected response
                try:
                    bot_response = response[0].get('generated_text', 'No response generated')
                except Exception as e:
                    bot_response = "I'm having trouble generating a response right now."
                    st.session_state.error_message = f"Error: {str(e)}"

            # Add messages to session history
            chat_entry = {
                "id": str(uuid.uuid4()),
                "user": user_input,
                "bot": bot_response  # Ensure both keys are present here
            }
            st.session_state.messages.append(chat_entry)

    # Initialize the chatbot
    chatbot = HuggingFaceChatbot()

    # Sidebar for selecting model
    with st.sidebar:
        st.header("Chat Settings")
        selected_model = st.selectbox(
            "Select AI Model", 
            list(API_MODELS.keys()), 
            index=0
        )

    # Display existing messages from session state
    for message in st.session_state.messages:
        if "user" in message:
            with st.chat_message("user"):
                st.markdown(message["user"])
        if "bot" in message:
            with st.chat_message("assistant"):
                st.markdown(message["bot"])

    # Chat input and response generation
    if prompt := st.chat_input("What would you like to ask?"):
        # Store and display the user input
        st.session_state.messages.append({"role": "user", "content": prompt})
        with st.chat_message("user"):
            st.markdown(prompt)

        # Generate a response from the selected model
        chatbot.process_message(prompt, selected_model)

        # Display bot's response
        for message in st.session_state.messages:
            if "bot" in message:  # Check for the "bot" key before displaying
                with st.chat_message("assistant"):
                    st.markdown(message["bot"])
