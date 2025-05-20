from flask import Flask, render_template, request, jsonify
import subprocess
import os

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/run', methods=['POST'])
def run_bot():
    topic = request.form.get('topic')
    mode = request.form.get('mode')
    interactions = request.form.get('interactions')

    try:
        subprocess.Popen([
            'python', 'foxglove.py'
        ], env={**os.environ, 'TOPIC': topic, 'MODE': mode, 'INTERACTIONS': interactions})
        return jsonify({"status": "Bot started"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# THIS MUST BE INCLUDED
if __name__ == '__main__':
    app.run(debug=True)
