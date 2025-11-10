from flask import Flask
from flask_cors import CORS
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from dotenv import load_dotenv

load_dotenv()

def create_app():
    app = Flask(__name__)
    CORS(app)

    # Rate limiting
    limiter = Limiter(
        app=app,
        key_func=get_remote_address,
        default_limits=["100 per hour"]
    )

    # Register blueprints
    from app.routes.weather_routes import weather_bp
    from app.routes.ai_routes import ai_bp

    app.register_blueprint(weather_bp)
    app.register_blueprint(ai_bp)

    @app.route('/api/health', methods=['GET'])
    def health_check():
        return {'status': 'healthy', 'message': 'Weather AI Forecast API is running'}

    return app
