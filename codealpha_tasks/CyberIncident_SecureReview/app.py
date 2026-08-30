import os
import logging
from pathlib import Path

from flask import (
    Flask,
    render_template,
    request,
    redirect,
    url_for,
    session,
    flash,
    abort
)

from flask_wtf.csrf import CSRFProtect
from werkzeug.security import (
    generate_password_hash,
    check_password_hash
)
from werkzeug.exceptions import HTTPException

from models import db, User, Incident


# ==========================================================
# APPLICATION CONFIGURATION
# ==========================================================

app = Flask(__name__)


# Secret key
# For production, set SECRET_KEY as an environment variable.
secret_key = os.environ.get("SECRET_KEY")

if not secret_key:
    # Local-development fallback.
    # Replace this with an environment variable in production.
    secret_key = "LOCAL-DEVELOPMENT-ONLY-CHANGE-ME"

app.config["SECRET_KEY"] = secret_key


# Database
BASE_DIR = Path(__file__).resolve().parent

app.config["SQLALCHEMY_DATABASE_URI"] = (
    "sqlite:///" + str(BASE_DIR / "cyberincident.db")
)

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False


# ==========================================================
# SECURITY CONFIGURATION
# ==========================================================

# Session cookie security
app.config["SESSION_COOKIE_HTTPONLY"] = True
app.config["SESSION_COOKIE_SAMESITE"] = "Lax"

# Local development uses HTTP.
# Set True when deployed behind HTTPS.
app.config["SESSION_COOKIE_SECURE"] = False


# Maximum request size
app.config["MAX_CONTENT_LENGTH"] = 5 * 1024 * 1024


# ==========================================================
# DATABASE INITIALIZATION
# ==========================================================

db.init_app(app)


# ==========================================================
# CSRF PROTECTION
# ==========================================================

csrf = CSRFProtect(app)


# ==========================================================
# LOGGING
# ==========================================================

logging.basicConfig(
    level=logging.INFO
)

logger = logging.getLogger(__name__)


# ==========================================================
# SECURITY HEADERS
# ==========================================================

@app.after_request
def add_security_headers(response):

    response.headers["X-Content-Type-Options"] = "nosniff"

    response.headers["X-Frame-Options"] = "DENY"

    response.headers[
        "Referrer-Policy"
    ] = "strict-origin-when-cross-origin"

    response.headers[
        "Content-Security-Policy"
    ] = (
        "default-src 'self'; "
        "style-src 'self' 'unsafe-inline'; "
        "script-src 'self'; "
        "img-src 'self' data:;"
    )

    return response


# ==========================================================
# HOME
# ==========================================================

@app.route("/")
def home():

    if "user_id" in session:
        return redirect(url_for("dashboard"))

    return redirect(url_for("login"))


# ==========================================================
# REGISTER
# ==========================================================

@app.route("/register", methods=["GET", "POST"])
def register():

    if request.method == "POST":

        username = request.form.get(
            "username",
            ""
        ).strip()

        password = request.form.get(
            "password",
            ""
        )

        # Input validation
        if not username or not password:

            flash(
                "Username and password are required."
            )

            return redirect(
                url_for("register")
            )

        if len(username) > 80:

            flash(
                "Username is too long."
            )

            return redirect(
                url_for("register")
            )

        if len(password) < 8:

            flash(
                "Password must contain at least 8 characters."
            )

            return redirect(
                url_for("register")
            )

        # Check existing user
        existing_user = User.query.filter_by(
            username=username
        ).first()

        if existing_user:

            flash(
                "Username already exists."
            )

            return redirect(
                url_for("register")
            )

        # Secure password hashing
        password_hash = generate_password_hash(
            password
        )

        user = User(
            username=username,
            password_hash=password_hash
        )

        db.session.add(user)
        db.session.commit()

        flash(
            "Registration successful. Please login."
        )

        return redirect(
            url_for("login")
        )

    return render_template(
        "register.html"
    )


# ==========================================================
# LOGIN
# ==========================================================

@app.route("/login", methods=["GET", "POST"])
def login():

    if request.method == "POST":

        username = request.form.get(
            "username",
            ""
        ).strip()

        password = request.form.get(
            "password",
            ""
        )

        user = User.query.filter_by(
            username=username
        ).first()

        # Secure password verification
        if user and check_password_hash(
            user.password_hash,
            password
        ):

            session.clear()

            session["user_id"] = user.id

            session["username"] = user.username

            flash(
                "Login successful."
            )

            return redirect(
                url_for("dashboard")
            )

        flash(
            "Invalid username or password."
        )

    return render_template(
        "login.html"
    )


# ==========================================================
# LOGOUT
# ==========================================================

@app.route(
    "/logout",
    methods=["POST"]
)
def logout():

    session.clear()

    flash(
        "You have been logged out."
    )

    return redirect(
        url_for("login")
    )


# ==========================================================
# DASHBOARD
# ==========================================================

@app.route("/dashboard")
def dashboard():

    # Authentication check
    if "user_id" not in session:

        return redirect(
            url_for("login")
        )

    # Authorization:
    # only retrieve incidents belonging
    # to the logged-in user
    incidents = Incident.query.filter_by(
        user_id=session["user_id"]
    ).order_by(
        Incident.id.desc()
    ).all()

    return render_template(
        "dashboard.html",
        incidents=incidents
    )


# ==========================================================
# REPORT INCIDENT
# ==========================================================

@app.route(
    "/report",
    methods=["GET", "POST"]
)
def report():

    if "user_id" not in session:

        return redirect(
            url_for("login")
        )

    if request.method == "POST":

        title = request.form.get(
            "title",
            ""
        ).strip()

        description = request.form.get(
            "description",
            ""
        ).strip()

        severity = request.form.get(
            "severity",
            ""
        ).strip()

        # Allowed severity values
        allowed_severity = {
            "Low",
            "Medium",
            "High",
            "Critical"
        }

        # Validate title
        if not title:

            flash(
                "Incident title is required."
            )

            return redirect(
                url_for("report")
            )

        if len(title) > 200:

            flash(
                "Title must be 200 characters or less."
            )

            return redirect(
                url_for("report")
            )

        # Validate description
        if not description:

            flash(
                "Incident description is required."
            )

            return redirect(
                url_for("report")
            )

        if len(description) > 5000:

            flash(
                "Description must be 5000 characters or less."
            )

            return redirect(
                url_for("report")
            )

        # Validate severity
        if severity not in allowed_severity:

            flash(
                "Invalid severity selected."
            )

            return redirect(
                url_for("report")
            )

        incident = Incident(
            title=title,
            description=description,
            severity=severity,
            status="Reported",
            user_id=session["user_id"]
        )

        db.session.add(incident)
        db.session.commit()

        flash(
            "Incident reported successfully."
        )

        return redirect(
            url_for("dashboard")
        )

    return render_template(
        "report.html"
    )


# ==========================================================
# VIEW INDIVIDUAL INCIDENT
# ==========================================================

@app.route("/incident/<int:incident_id>")
def view_incident(incident_id):

    if "user_id" not in session:

        return redirect(
            url_for("login")
        )

    incident = Incident.query.get_or_404(
        incident_id
    )

    # Authorization check
    if incident.user_id != session["user_id"]:

        abort(403)

    return render_template(
        "dashboard.html",
        incidents=[incident]
    )


# ==========================================================
# ERROR HANDLERS
# ==========================================================

@app.errorhandler(403)
def forbidden(error):

    return render_template(
        "error.html",
        code=403,
        message="You are not authorized to access this resource."
    ), 403


@app.errorhandler(404)
def not_found(error):

    return render_template(
        "error.html",
        code=404,
        message="The requested page was not found."
    ), 404


@app.errorhandler(413)
def request_too_large(error):

    return render_template(
        "error.html",
        code=413,
        message="Uploaded/request data is too large."
    ), 413


@app.errorhandler(Exception)
def handle_exception(error):

    # Keep HTTP errors unchanged
    if isinstance(error, HTTPException):
        return error

    # Detailed error goes to server logs,
    # not to the user.
    logger.exception(
        "Unexpected application error"
    )

    return render_template(
        "error.html",
        code=500,
        message="An unexpected error occurred."
    ), 500


# ==========================================================
# DATABASE CREATION
# ==========================================================

with app.app_context():

    db.create_all()


# ==========================================================
# APPLICATION START
# ==========================================================

if __name__ == "__main__":
    app.run(
        host="127.0.0.1",
        port=5000,
        debug=False
    )