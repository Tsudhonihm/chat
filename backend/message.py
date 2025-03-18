from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/message', methods=['POST'])
def message():
    try:
        # Extract the message from the request body
        data = request.get_json()
        user_message = data.get('message')

        if not user_message:
            return jsonify({'error': 'No message provided'}), 400

        # Simulate a bot response
        bot_response = f"You said: {user_message}"
        return jsonify({'response': bot_response})

    except Exception as e:
        # Log the error and return a 500 response
        print(f"Error processing request: {e}")
        return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    app.run(debug=True)
