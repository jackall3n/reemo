"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let template = (options) => (`
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
    <!-- The character set should be utf-8 -->
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <!-- Enables media queries -->
    <meta name="viewport" content="width=device-width"/>
    <!-- Link to the email's CSS, which will be inlined into the email -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/foundation-emails/2.2.1/foundation-emails.min.css">
    </head>

    <body>
  <table class="body" data-made-with-foundation>
    <tr>
      <td valign="top">
            <p>${options.user.name.first}!</p>
            <table class="spacer"><tbody><tr><td height="10px" style="font-size:10px;line-height:10px;">&#xA0;</td></tr></tbody></table>
            <p>It look's like you made an account, but didn't go through and donate. If you think this is wrong then please reply to this email and we'll sort it out.</p>
            <table class="spacer"><tbody><tr><td height="10px" style="font-size:10px;line-height:10px;">&#xA0;</td></tr></tbody></table>
            <p>Entry closes at 15:30 today, any donations after will go to the charity but no new participants can be selected :(</p>
            <table class="spacer"><tbody><tr><td height="10px" style="font-size:10px;line-height:10px;">&#xA0;</td></tr></tbody></table>
            <p>Warmest regards,</p>
            <p>www.sweep-stake.uk.</p>
      </td>
    </tr>
  </table>
</body>


    </html>
`);
class RemindTemplate {
    static parse(options) {
        return template(options);
    }
}
exports.RemindTemplate = RemindTemplate;
