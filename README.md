# ws-form-error
This is plugin check error for form. FORM request with ajax.

#### USING:

$('#myDiv').wsFormError();

#### OPTIONS:
```
$('#myDiv').wsFormError({
    enable: true, // on-off plugin - Default: true
    select: "input, textarea", // Type input of form
    message: true // on-off notification error - Default: false
});
```
#### TUTORIAL:
To using this plugin, you add class "ws-required" in input,textarea.....
- Check Number: you add class to input,textarea "ws-required-number"
- Check Phone: you add class to input,textarea "ws-required-phone"
- Check Email: you add class to input,textarea "ws-required-email"

#### NOTIFICATION:
To set content notification error of plugin you add attribute:
- data-wserror-xx="content message notification error" (xx: phone, email, number)
