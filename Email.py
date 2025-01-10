from flask import Flask, request, jsonify
import smtplib

app = Flask(__name__)

@app.route("/email", methods=["POST"])
def email_quote():
    data = request.json
    email = data["email"]
    quote = data["quote"]
    author = data["author"]

    try:
        with smtplib.SMTP("smtp.gmail.com", 587) as smtp:
            smtp.starttls()
            smtp.login("your-email@gmail.com", "your-password")
            subject = "Your Daily Quote"
            body = f"{quote}\n\n{author}"
            msg = f"Subject: {subject}\n\n{body}"
            smtp.sendmail("your-email@gmail.com", email, msg)

        return jsonify({"success": True}), 200
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
