from flask import Flask, jsonify
from system_metrics import get_system_metrics
from flask_cors import CORS

#the backend is a flask app that acts as a JSON API
app = Flask(__name__)
CORS(app) #allows the frontend to request backend


@app.route('/api/stats', methods=['GET'])
def system_stats(): #returns the system metrics as a json
    metrics = get_system_metrics()
    return jsonify({
        "cpu": metrics["cpu"],
        "memory": metrics["memory"],
        "disk": metrics["disk"],
        "network": {
            "bytes_sent": metrics["network"].bytes_sent,
            "bytes_recv": metrics["network"].bytes_recv
        },
        "process_count": metrics["process_count"]
    })


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=True) #runs the app on port 8000
