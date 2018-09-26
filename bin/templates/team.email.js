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
            <table class="spacer"><tbody><tr><td height="5px" style="font-size:5px;line-height:5px;">&#xA0;</td></tr></tbody></table>
            <p>All donations have been processed and your teams have been selected.</p>
            <table class="spacer"><tbody><tr><td height="5px" style="font-size:5px;line-height:5px;">&#xA0;</td></tr></tbody></table>
            
            <p>Due to there being 32 teams and under 32 participants, it looks like you're going to be supporting <b>${options.teams.length}</b> teams! (Excluding your national team which we couldn't possibly know)</p>
            
            <table class="spacer"><tbody><tr><td height="5px" style="font-size:5px;line-height:5px;">&#xA0;</td></tr></tbody></table>

            ${options.teams.map((t, i) => {
    return `
                        <p>Team ${i + 1}: <b>${t.name}</b>!</p>
                        <p><img src="https://api.fifa.com/api/v1/picture/flags-fwc2018-3/${t.code}"/></p>
                `;
})}

            <table class="spacer"><tbody><tr><td height="5px" style="font-size:5px;line-height:5px;">&#xA0;</td></tr></tbody></table>
            <p>You can view your teams on your <a href="https://www.sweep-stake.uk/#/account">Account</a>.</p>
            <table class="spacer"><tbody><tr><td height="5px" style="font-size:5px;line-height:5px;">&#xA0;</td></tr></tbody></table>
            <p>Let us know if you have any questions. Good luck!</p>
            <table class="spacer"><tbody><tr><td height="5px" style="font-size:5px;line-height:5px;">&#xA0;</td></tr></tbody></table>
            <p>Warmest regards,</p>
            <p>www.sweep-stake.uk.</p>
      </td>
    </tr>
  </table>
</body>
    </html>
`);
class TeamTemplate {
    static parse(options) {
        return template(options);
    }
}
exports.TeamTemplate = TeamTemplate;
