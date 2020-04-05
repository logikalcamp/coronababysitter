'use strict';

const mailer = require('nodemailer')

class EmailService {
    constructor() {
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    }

    async sendEmail(recipientEmail, email) {
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

        transporter.sendMail(mailOptions);
    }

    getSystemEmail() {
        // TODO: Save in DB / encrypted ?
        return {
            // type: 'OAuth2',
            user: 'AppSitterSeeker@gmail.com',
            pass: 'sitterseeker2020'
        }
    }

    getApproveEmail(createUserLink, type) {
        var mail = {
            'title': 'איזה כיף, עברת את האישור הראשוני!',
            'body': `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html><head>    <meta charset="UTF-8">    <meta content="width=device-width, initial-scale=1" name="viewport">    <meta name="x-apple-disable-message-reformatting">    <meta http-equiv="X-UA-Compatible" content="IE=edge">    <meta content="telephone=no" name="format-detection">    <title>Sitter Seeker Code</title>    <style type="text/css">		a {text-decoration: none;}		td {background-color:#00C2CB}    </style>    <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]-->    <!--[if !mso]><!-- -->    <link href="https://fonts.googleapis.com/css?family=Roboto:400,400i,700,700i" rel="stylesheet">    <!--<![endif]--></head><body>    <div class="es-wrapper-color">        <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">            <v:fill type="tile" color="#00C2CB" origin="0.5, 0" position="0.5,0"></v:fill>        </v:background>        <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0">            <tbody>                <tr>                    <td class="esd-email-paddings st-br" valign="top">                        <table cellpadding="0" cellspacing="0" class="es-content esd-header-popover" align="center">                            <tbody>                                <tr>                                    <td class="esd-stripe" align="center">                                        <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" width="600">                                            <tbody>                                                <tr>                                                    <td class="es-p20t es-p30r es-p30l esd-structure" align="left">                                                        <table cellpadding="0" cellspacing="0" width="100%">                                                            <tbody>                                                                <tr>                                                                    <td width="540" class="esd-container-frame" align="center" valign="top">                                                                        <table cellpadding="0" cellspacing="0" width="100%">                                                                            <tbody>                                                                                <tr>                                                                                    <td align="center" class="esd-block-image" style="font-size: 0px;"><a target="_blank"><img class="adapt-img" src="https://fsbyqt.stripocdn.email/content/guids/b8819b43-47e8-40e3-85ca-1ce74f0bba02/images/34781585932137170.png" alt style="display: block;" width="500"></a></td>                                                                                </tr>                                                                            </tbody>                                                                        </table>                                                                    </td>                                                                </tr>                                                            </tbody>                                                        </table>                                                    </td>                                                </tr>                                            </tbody>                                        </table>                                    </td>                                </tr>                            </tbody>                        </table>                        <table cellpadding="0" cellspacing="0" class="es-content esd-footer-popover" align="center">                            <tbody>                                <tr>                                    <td class="esd-stripe" align="center">                                        <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" width="600">                                            <tbody>                                                <tr>                                                    <td class="es-p20t es-p30r es-p30l esd-structure" align="left">                                                        <table cellpadding="0" cellspacing="0" width="100%">                                                            <tbody>                                                                <tr>                                                                    <td width="540" class="esd-container-frame" align="center" valign="top">                                                                        <table cellpadding="0" cellspacing="0" width="100%">                                                                            <tbody>                                                                                <tr>                                                                                    <td align="center" class="esd-block-text es-p10">                                                                                        <p style="direction: rtl; color: #ece8e8; line-height: 100%; font-size: 26px;">החמ"ל שלנו אישר את הפרטים שלך ואפשר לסיים את תהליך הרישום לאתר</p>                                                                                    </td>                                                                                </tr>																				${type == 'doctor' ? '<tr>                                                                                    <td align="center" class="esd-block-text es-p10">                                                                                        <p style="direction: rtl; color: #ece8e8; line-height: 100%; font-size: 26px;">עוד כמה פרטים קטנים וסיימנו</p>                                                                                    </td>                                                                                </tr>' : ''}                                                                              <tr>                                                                                    <td align="center" class="esd-block-text">                                                                                        <p style="color: #e4dfdf; font-size: 45px;"><a href="{link}">${type == 'doctor' ? 'לחץ כאן להרשמה' : 'לחץ כאן להתחברות'}</a></p>                                                                                    </td>                                                                                </tr>                                                                            </tbody>                                                                        </table>                                                                    </td>                                                                </tr>                                                            </tbody>                                                        </table>                                                    </td>                                                </tr>                                                <tr>                                                    <td class="esd-structure es-p15t es-p15b es-p20r es-p20l" style="background-color: #00c2cb;" bgcolor="#00C2CB" align="left" esd-custom-block-id="55545">                                                        <table cellspacing="0" cellpadding="0" width="100%">                                                            <tbody>                                                                <tr>                                                                    <td class="esd-container-frame" width="560" align="left">                                                                        <table width="100%" cellspacing="0" cellpadding="0">                                                                            <tbody>                                                                                <tr>                                                                                    <td class="esd-block-social es-p10t es-m-txt-c" align="center" style="font-size: 0px;">                                                                                        <table class="es-table-not-adapt es-social" cellspacing="0" cellpadding="0">                                                                                            <tbody>                                                                                                <tr>                                                                                                    <td class="es-p10r" valign="top" align="center"><a target="_blank" href="https://www.facebook.com/RuthVrobel/"><img title="Facebook" src="https://fsbyqt.stripocdn.email/content/assets/img/social-icons/circle-black/facebook-circle-black.png" alt="Fb" width="32"></a></td>                                                                                                    <td class="es-p10r" valign="top" align="center"><a target="_blank" href="mailto:info@ruthf.org?subject=מייל מאתר סיטרסיקר"><img title="Mail" src="https://fsbyqt.stripocdn.email/content/assets/img/other-icons/circle-black/mail-circle-black.png" alt="Inst" width="32"></a></td>                                                                                                    <td valign="top" align="center"><a target="_blank" href="https://www.youtube.com/channel/UCkjW1hsjTfcOpcrj2sQeXFQ/featured"><img title="Youtube" src="https://fsbyqt.stripocdn.email/content/assets/img/social-icons/circle-black/youtube-circle-black.png" alt="Yt" width="32"></a></td>                                                                                                </tr>                                                                                            </tbody>                                                                                        </table>                                                                                    </td>                                                                                </tr>                                                                            </tbody>                                                                        </table>                                                                    </td>                                                                </tr>                                                            </tbody>                                                        </table>                                                    </td>                                                </tr>                                            </tbody>                                        </table>                                    </td>                                </tr>                            </tbody>                        </table>                    </td>                </tr>            </tbody>        </table>    </div></body></html>`
        }

        mail.body = mail.body.replace('{link}', createUserLink);

        return mail;
    }

    getRejectEmail() {
        return {
            'title': 'לצערנו אי אפשר להוסיף לך משתמש',
            'body': '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html><head>    <meta charset="UTF-8">    <meta content="width=device-width, initial-scale=1" name="viewport">    <meta name="x-apple-disable-message-reformatting">    <meta http-equiv="X-UA-Compatible" content="IE=edge">    <meta content="telephone=no" name="format-detection">    <title>Sitter Seeker Code</title>    <style type="text/css">		a {text-decoration: none;}		td {background-color:#00C2CB}    </style>    <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]-->    <!--[if !mso]><!-- -->    <link href="https://fonts.googleapis.com/css?family=Roboto:400,400i,700,700i" rel="stylesheet">    <!--<![endif]--></head><body>    <div class="es-wrapper-color">        <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">            <v:fill type="tile" color="#00C2CB" origin="0.5, 0" position="0.5,0"></v:fill>        </v:background>        <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0">            <tbody>                <tr>                    <td class="esd-email-paddings st-br" valign="top">                        <table cellpadding="0" cellspacing="0" class="es-content esd-header-popover" align="center">                            <tbody>                                <tr>                                    <td class="esd-stripe" align="center">                                        <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" width="600">                                            <tbody>                                                <tr>                                                    <td class="es-p20t es-p30r es-p30l esd-structure" align="left">                                                        <table cellpadding="0" cellspacing="0" width="100%">                                                            <tbody>                                                                <tr>                                                                    <td width="540" class="esd-container-frame" align="center" valign="top">                                                                        <table cellpadding="0" cellspacing="0" width="100%">                                                                            <tbody>                                                                                <tr>                                                                                    <td align="center" class="esd-block-image" style="font-size: 0px;"><a target="_blank"><img class="adapt-img" src="https://fsbyqt.stripocdn.email/content/guids/b8819b43-47e8-40e3-85ca-1ce74f0bba02/images/34781585932137170.png" alt style="display: block;" width="500"></a></td>                                                                                </tr>                                                                            </tbody>                                                                        </table>                                                                    </td>                                                                </tr>                                                            </tbody>                                                        </table>                                                    </td>                                                </tr>                                            </tbody>                                        </table>                                    </td>                                </tr>                            </tbody>                        </table>                        <table cellpadding="0" cellspacing="0" class="es-content esd-footer-popover" align="center">                            <tbody>                                <tr>                                    <td class="esd-stripe" align="center">                                        <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" width="600">                                            <tbody>                                                <tr>                                                    <td class="es-p20t es-p30r es-p30l esd-structure" align="left">                                                        <table cellpadding="0" cellspacing="0" width="100%">                                                            <tbody>                                                                <tr>                                                                    <td width="540" class="esd-container-frame" align="center" valign="top">                                                                        <table cellpadding="0" cellspacing="0" width="100%">                                                                            <tbody>                                                                                <tr>                                                                                    <td align="center" class="esd-block-text es-p10">                                                                                        <p style="direction: rtl; color: #ece8e8; line-height: 100%; font-size: 26px;">החמ"ל שלנו עבר על הפרטים שלך ולצערנו לא עברת את האישור הראשוני על מנת לסיים הרשמה למערכת</p>                                                                                    </td>                                                                                </tr>																				<tr>                                                                                    <td align="center" class="esd-block-text es-p10">                                                                                        <p style="direction: rtl; color: #ece8e8; line-height: 100%; font-size: 26px;">בשלב זה לא נוכל ליצור לך משתמש, באפשרותך ליצור קשר עם החמ"ל כדי להבין מה הייתה הבעיה</p>                                                                                    </td>                                                                                </tr>                                                                            </tbody>                                                                        </table>                                                                    </td>                                                                </tr>                                                            </tbody>                                                        </table>                                                    </td>                                                </tr>                                                <tr>                                                    <td class="esd-structure es-p15t es-p15b es-p20r es-p20l" style="background-color: #00c2cb;" bgcolor="#00C2CB" align="left" esd-custom-block-id="55545">                                                        <table cellspacing="0" cellpadding="0" width="100%">                                                            <tbody>                                                                <tr>                                                                    <td class="esd-container-frame" width="560" align="left">                                                                        <table width="100%" cellspacing="0" cellpadding="0">                                                                            <tbody>                                                                                <tr>                                                                                    <td class="esd-block-social es-p10t es-m-txt-c" align="center" style="font-size: 0px;">                                                                                        <table class="es-table-not-adapt es-social" cellspacing="0" cellpadding="0">                                                                                            <tbody>                                                                                                <tr>                                                                                                    <td class="es-p10r" valign="top" align="center"><a target="_blank" href="https://www.facebook.com/RuthVrobel/"><img title="Facebook" src="https://fsbyqt.stripocdn.email/content/assets/img/social-icons/circle-black/facebook-circle-black.png" alt="Fb" width="32"></a></td>                                                                                                    <td class="es-p10r" valign="top" align="center"><a target="_blank" href="mailto:info@ruthf.org?subject=מייל מאתר סיטרסיקר"><img title="Mail" src="https://fsbyqt.stripocdn.email/content/assets/img/other-icons/circle-black/mail-circle-black.png" alt="Mail" width="32"></a></td>                                                                                                    <td class="es-p10r" valign="top" align="center"><a target="_blank" href="tel:+972526384738"><img title="Phone" src="https://fsbyqt.stripocdn.email/content/assets/img/other-icons/circle-black/phone-circle-black.png" alt="Phone" width="32"></a></td>                                                                                                    <td valign="top" align="center"><a target="_blank" href="https://www.youtube.com/channel/UCkjW1hsjTfcOpcrj2sQeXFQ/featured"><img title="Youtube" src="https://fsbyqt.stripocdn.email/content/assets/img/social-icons/circle-black/youtube-circle-black.png" alt="Yt" width="32"></a></td>                                                                                                </tr>                                                                                            </tbody>                                                                                        </table>                                                                                    </td>                                                                                </tr>                                                                            </tbody>                                                                        </table>                                                                    </td>                                                                </tr>                                                            </tbody>                                                        </table>                                                    </td>                                                </tr>                                            </tbody>                                        </table>                                    </td>                                </tr>                            </tbody>                        </table>                    </td>                </tr>            </tbody>        </table>    </div></body></html>'
        }
    }

    getLoginEmail(code) {
        var emailInfo = {
            'title': 'קוד ההתחברות שלך',
            'body': '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html><head>    <meta charset="UTF-8">    <meta content="width=device-width, initial-scale=1" name="viewport">    <meta name="x-apple-disable-message-reformatting">    <meta http-equiv="X-UA-Compatible" content="IE=edge">    <meta content="telephone=no" name="format-detection">    <title>Sitter Seeker Code</title>    <style type="text/css">		a {text-decoration: none;}		td {background-color:#00C2CB}    </style>    <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]-->    <!--[if !mso]><!-- -->    <link href="https://fonts.googleapis.com/css?family=Roboto:400,400i,700,700i" rel="stylesheet">    <!--<![endif]--></head><body>    <div class="es-wrapper-color">        <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">            <v:fill type="tile" color="#00C2CB" origin="0.5, 0" position="0.5,0"></v:fill>        </v:background>        <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0">            <tbody>                <tr>                    <td class="esd-email-paddings st-br" valign="top">                        <table cellpadding="0" cellspacing="0" class="es-content esd-header-popover" align="center">                            <tbody>                                <tr>                                    <td class="esd-stripe" align="center">                                        <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" width="600">                                            <tbody>                                                <tr>                                                    <td class="es-p20t es-p30r es-p30l esd-structure" align="left">                                                        <table cellpadding="0" cellspacing="0" width="100%">                                                            <tbody>                                                                <tr>                                                                    <td width="540" class="esd-container-frame" align="center" valign="top">                                                                        <table cellpadding="0" cellspacing="0" width="100%">                                                                            <tbody>                                                                                <tr>                                                                                    <td align="center" class="esd-block-image" style="font-size: 0px;"><a target="_blank"><img class="adapt-img" src="https://fsbyqt.stripocdn.email/content/guids/b8819b43-47e8-40e3-85ca-1ce74f0bba02/images/34781585932137170.png" alt style="display: block;" width="500"></a></td>                                                                                </tr>                                                                            </tbody>                                                                        </table>                                                                    </td>                                                                </tr>                                                            </tbody>                                                        </table>                                                    </td>                                                </tr>                                            </tbody>                                        </table>                                    </td>                                </tr>                            </tbody>                        </table>                        <table cellpadding="0" cellspacing="0" class="es-content esd-footer-popover" align="center">                            <tbody>                                <tr>                                    <td class="esd-stripe" align="center">                                        <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" width="600">                                            <tbody>                                                <tr>                                                    <td class="es-p20t es-p30r es-p30l esd-structure" align="left">                                                        <table cellpadding="0" cellspacing="0" width="100%">                                                            <tbody>                                                                <tr>                                                                    <td width="540" class="esd-container-frame" align="center" valign="top">                                                                        <table cellpadding="0" cellspacing="0" width="100%">                                                                            <tbody>                                                                                <tr>                                                                                    <td align="center" class="esd-block-text es-p10">                                                                                        <p style="direction: rtl; color: #ece8e8; line-height: 100%; font-size: 26px;">אהלן! טוב שחזרת, הקוד הסודי שלך הוא</p>                                                                                    </td>                                                                                </tr>                                                                                <tr>                                                                                    <td align="center" class="esd-block-text">                                                                                        <p style="color: #e4dfdf; font-size: 45px;">{code}</p>                                                                                    </td>                                                                                </tr>                                                                            </tbody>                                                                        </table>                                                                    </td>                                                                </tr>                                                            </tbody>                                                        </table>                                                    </td>                                                </tr>                                                <tr>                                                    <td class="esd-structure es-p15t es-p15b es-p20r es-p20l" style="background-color: #00c2cb;" bgcolor="#00C2CB" align="left" esd-custom-block-id="55545">                                                        <table cellspacing="0" cellpadding="0" width="100%">                                                            <tbody>                                                                <tr>                                                                    <td class="esd-container-frame" width="560" align="left">                                                                        <table width="100%" cellspacing="0" cellpadding="0">                                                                            <tbody>                                                                                <tr>                                                                                    <td class="esd-block-social es-p10t es-m-txt-c" align="center" style="font-size: 0px;">                                                                                        <table class="es-table-not-adapt es-social" cellspacing="0" cellpadding="0">                                                                                            <tbody>                                                                                                <tr>                                                                                                    <td class="es-p10r" valign="top" align="center"><a target="_blank" href="https://www.facebook.com/RuthVrobel/"><img title="Facebook" src="https://fsbyqt.stripocdn.email/content/assets/img/social-icons/circle-black/facebook-circle-black.png" alt="Fb" width="32"></a></td>                                                                                                    <td class="es-p10r" valign="top" align="center"><a target="_blank" href="mailto:info@ruthf.org?subject=מייל מאתר סיטרסיקר"><img title="Mail" src="https://fsbyqt.stripocdn.email/content/assets/img/other-icons/circle-black/mail-circle-black.png" alt="Inst" width="32"></a></td>                                                                                                    <td valign="top" align="center"><a target="_blank" href="https://www.youtube.com/channel/UCkjW1hsjTfcOpcrj2sQeXFQ/featured"><img title="Youtube" src="https://fsbyqt.stripocdn.email/content/assets/img/social-icons/circle-black/youtube-circle-black.png" alt="Yt" width="32"></a></td>                                                                                                </tr>                                                                                            </tbody>                                                                                        </table>                                                                                    </td>                                                                                </tr>                                                                            </tbody>                                                                        </table>                                                                    </td>                                                                </tr>                                                            </tbody>                                                        </table>                                                    </td>                                                </tr>                                            </tbody>                                        </table>                                    </td>                                </tr>                            </tbody>                        </table>                    </td>                </tr>            </tbody>        </table>    </div></body></html>'
        }
        
        emailInfo.body = emailInfo.body.replace('{code}', code.toString());

        return emailInfo;
    }
}

module.exports.EmailService = EmailService;