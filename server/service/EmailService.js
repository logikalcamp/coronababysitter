'use strict';

const mailer = require('nodemailer')

class EmailService {

    constructor() {

    }

    sendEmail(recipientEmail, email) {
        var transporter = mailer.createTransport({
            service: 'gmail',
            auth: this.getSystemEmail()
        });

        var mailOptions = {
            from: this.getSystemEmail().user,
            to: recipientEmail,
            subject: email.title,
            html: email.body
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                return 0
            }

            return 1
        });
    }

    getSystemEmail() {
        // TODO: Save in DB / encrypted ?
        return {
            type: 'OAuth2',
            user: 'sitterseekerapp@gmail.com',
            pass: 'coronababy2020'
        }
    }

    getApproveEmail(createUserLink) {
        return {
            'title': 'איזה כיף, עברת את האישור הראשוני!',
            'body': '<h1>Welcome!</h1><p>החמ"ל שלנו אישר את הפרטים שלך, ואפשר לסיים את תהליך הרישום לאתר.</p><br><p>רק עוד כמה פרטים קטנים וסיימנו</p><br><p>הירשם כאן: ' + createUserLink + '</p>'
        }
    }

    getRejectEmail() {
        return {
            'title': 'לצעירנו אי אפשר להוסיף לך משתמש',
            'body': '<h1>Oh no!</h1><p>החמ"ל שלנו עבר על הפרטים שלך, והיו כמה דברים שלא הסתדרו..</p><br><p>בשלב זה לא נוכל ליצור לך משתמש, אבל תמיד אפשר ליצור קשר עם החמ"ל כדי להבין מה הייתה הבעיה</p>'
        }
    }
}

module.exports.EmailService = EmailService;